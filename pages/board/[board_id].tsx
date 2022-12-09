import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { makePusher } from '../../libs/usePusher'
import type { Channel } from 'pusher-js'
import type { GetServerSideProps, NextPage } from 'next'
import { fetcher, useTenet } from '../../libs/getClient'
import { getGqlToken } from '../../libs/cookies'

type BoardPageProps = { initialBoardData: any }

const BoardPage: NextPage<BoardPageProps> = ({ initialBoardData }) => {
  const router = useRouter()
  const {
    isReady,
    query: { board_id: rawBoardId },
  } = router
  const user = getUser()
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)

  const [context] = useState<BoardState>(new BoardState({}))
  const boardId = isReady && typeof rawBoardId === 'string' ? rawBoardId : ''

  const { data: boardData } = useTenet<{ board: any }>({
    operationName: 'getBoard',
    variables: personaId
      ? {
          topicId: boardId,
          personaId,
        }
      : { topicId: boardId },
    fallbackData: initialBoardData,
  })
  context.id = boardData?.board.id ?? null
  context.title = boardData?.board.title ?? null
  context.description = boardData?.board.description ?? null
  context.posts = boardData?.board.posts.map((v: any) => PostState.fromPostTypeJSON(v)) ?? []

  const { data: followingBoardData, mutate: mutateFollowingBoard } = useTenet<{
    getFollowingBoard: any
  }>({
    operationName: 'getFollowingBoard',
    variables: { personaId: personaId ?? 0 },
    token: getGqlToken(),
  })

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
      const postIds = boardData?.board.posts.map((post: any) => post.id) ?? []

      const postChannels: Channel[] = []

      postIds.forEach((postId: any) => {
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

  const following = followingBoardData?.getFollowingBoard.some(
    (boardData: any) => boardId && boardData.board.id === boardId
  )

  const onFollowButtonClick = async (): Promise<void> => {
    if (!following) {
      await fetcher({
        operationName: 'createFollowingBoard',
        variables: {
          personaId: personaId ?? 0,
          boardId: boardId,
        },
        token: getGqlToken(),
      })
      await mutateFollowingBoard()
    } else {
      await fetcher({
        operationName: 'unfollowBoard',
        variables: {
          personaId: personaId ?? 0,
          boardId: boardId,
        },
        token: getGqlToken(),
      })
      await mutateFollowingBoard()
    }
  }

  const boardProps = boardId
    ? {
        followButtonType: (following ? 'unfollow' : 'follow') as 'unfollow' | 'follow',
        onFollowButtonClick,
      }
    : {}

  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <PostFormStateContext.Provider value={new PostFormState({ boardState: context })}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout
            main={
              <BoardStateContext.Provider value={context}>
                <Board {...boardProps} />
              </BoardStateContext.Provider>
            }
            side={<div className="max-w-xs">test</div>}
          />
        </PostFormStateContext.Provider>
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

type BoardPageParams = {
  boardId: string
}

export const getServerSideProps: GetServerSideProps<BoardPageProps, BoardPageParams> = async (
  context
) => {
  const { params } = context
  if (!params) throw new Error('params of board page is undefined')
  const { boardId } = params

  const initialBoardData = await fetcher({
    operationName: 'getBoard',
    variables: { topicId: boardId },
  })

  return { props: { initialBoardData } }
}

export default BoardPage
