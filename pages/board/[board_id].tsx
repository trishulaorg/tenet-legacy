import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { apiHooks, client } from '../../libs/fetchAPI'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { makePusher } from '../../libs/usePusher'
import type { Channel } from 'pusher-js'
import { swrKey } from '../../libs/swrKey'
import { getSdk } from '../../server/autogen/definition'
import { GraphQLClient } from 'graphql-request'
import type { NextPage } from 'next'

const IndexPage: NextPage<{ initialBoardData: any }> = ({ initialBoardData }) => {
  const router = useRouter()
  const {
    isReady,
    query: { board_id: rawBoardId },
  } = router
  const user = getUser()
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)

  const [context] = useState<BoardState>(new BoardState({}))
  const boardId = isReady && typeof rawBoardId === 'string' ? rawBoardId : ''

  const { data: boardData } = apiHooks.useGetBoard(
    () => boardId,
    personaId
      ? {
          topicId: boardId,
          personaId,
        }
      : { topicId: boardId },
    {
      fallbackData: initialBoardData,
    }
  )

  const { data: followingBoardData, mutate: mutateFollowingBoard } = apiHooks.useGetFollowingBoard(
    () => (personaId ? swrKey.useGetFollowingBoard({ personaId: personaId }) : undefined),
    { personaId: personaId ?? 0 }
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user.token !== 'INVALID_TOKEN' && !user.requested) {
        await user.request()
        if (user.personas.length < 1) {
          await router.push('/persona/onboarding')
        }
        if (user.currentPersona?.id) {
          setPersonaId(user.currentPersona.id)
        }
      }

      const pusher = await makePusher()
      const postIds = boardData?.board.posts.map((post) => post.id) ?? []

      const postChannels: Channel[] = []

      postIds.forEach((postId) => {
        if (user?.notifications.every((notification) => notification.channel !== postId)) {
          postChannels.push(pusher.subscribe(postId))
        }
      })

      postChannels.forEach((channel) =>
        user?.subscribeNotifications(channel, 'typing', () => {
          /* no-op */
        })
      )
    }
    f()
  })

  useEffect(() => {
    if (boardData) {
      context.id = boardData.board.id
      context.title = boardData.board.title
      context.description = boardData.board.description
      context.posts = boardData.board.posts.map((v) => PostState.fromPostTypeJSON(v))
    }
  }, [boardData])

  const following = followingBoardData?.getFollowingBoard.some(
    (boardData) => boardId && boardData.board.id === boardId
  )

  const onFollowButtonClick = async (): Promise<void> => {
    if (!following) {
      await client.createFollowingBoard({
        personaId: personaId ?? 0,
        boardId: boardId,
      })
      await mutateFollowingBoard()
    } else {
      await client.unfollowBoard({
        personaId: personaId ?? 0,
        boardId: boardId,
      })
      await mutateFollowingBoard()
    }
  }

  const main: React.FC = () => (
    <>
      <BoardStateContext.Provider value={context}>
        {boardId ? (
          <Board
            followButtonType={following ? 'unfollow' : 'follow'}
            onFollowButtonClick={onFollowButtonClick}
          />
        ) : (
          <Board />
        )}
      </BoardStateContext.Provider>
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <PostFormStateContext.Provider value={new PostFormState({ boardState: context })}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
        </PostFormStateContext.Provider>
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export async function getServerSideProps(context: any) {
  const client = getSdk(new GraphQLClient('https://coton.vercel.app/api/graphql'))
  const req = await context.req
  const boardURL = req.url.toString()
  const boardId = boardURL.slice(
    boardURL.indexOf('board/') + 6
  ) /* Add 6 to get only ID, without 'board/' */

  const initialBoardData = await client.getBoard({ topicId: boardId } as any)
  return {
    props: {
      initialBoardData,
    },
  }
}

export default IndexPage
