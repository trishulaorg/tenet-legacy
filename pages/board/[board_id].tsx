import React, { useEffect, useState } from 'react'
import { getUser, useUserState } from '../../states/UserState'
import type { BoardType, FollowingBoardType, PostType } from '../../states/PostState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { makePusher } from '../../libs/usePusher'
import type { Channel } from 'pusher-js'
import type { GetServerSideProps, NextPage } from 'next'
import { apiClientImplMock, useApiClient } from '../../states/ApiClientState'

type BoardPageProps = { boardData: BoardType }

const BoardPage: NextPage<BoardPageProps> = ({ boardData }) => {
  const router = useRouter()
  const {
    isReady,
    query: { board_id: rawBoardId },
  } = router
  const user = getUser()
  const userState = useUserState()

  const [context, setContext] = useState(new BoardState({}))
  const boardId = isReady && typeof rawBoardId === 'string' ? rawBoardId : ''

  useEffect(() => {
    setContext(
      new BoardState({
        id: boardData.id,
        title: boardData.title,
        description: boardData.description,
        posts: boardData.posts.map((post) => PostState.fromPostTypeJSON(post)),
      })
    )
  }, [boardData])

  const [followingBoardData, setFollowingBoardData] = useState<FollowingBoardType>()

  const apiClient = useApiClient()

  async function getFollowingBoard(personaId: number): Promise<void> {
    const data = (
      await apiClient.getFollowingBoard({
        personaId,
      })
    ).getFollowingBoard
    setFollowingBoardData(data)
  }

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user.token !== 'INVALID_TOKEN' && !user.requested) {
        await user.request()
        if (user.personas.length < 1) {
          await router.push('/persona/onboarding')
        }
      }

      const pusher = await makePusher()
      const postIds = boardData?.posts.map((post: PostType) => post.id) ?? []

      const postChannels: Channel[] = []

      postIds.forEach((postId: string) => {
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

  const following = followingBoardData?.some(
    (boardData) => boardId && boardData.board.id === boardId
  )

  const onFollowButtonClick = async (): Promise<void> => {
    if (following == null) {
      throw new Error('following is null')
    }
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    const personaId = Number(userState.currentPersona.id)
    if (!following) {
      await apiClient.createFollowingBoard({
        personaId,
        boardId,
      })
      await getFollowingBoard(personaId)
    } else {
      await apiClient.unfollowBoard({
        personaId,
        boardId,
      })
      await getFollowingBoard(personaId)
    }
  }

  const boardProps = boardId
    ? {
        followButtonType: (following ? 'unfollow' : 'follow') as 'unfollow' | 'follow',
        onFollowButtonClick,
      }
    : {}

  return (
    <PageContentLayout
      main={
        <PostFormStateContext.Provider value={new PostFormState({ boardState: context })}>
          <BoardStateContext.Provider value={context}>
            <Board {...boardProps} />
          </BoardStateContext.Provider>
        </PostFormStateContext.Provider>
      }
      side={<div className="max-w-xs">test</div>}
    />
  )
}

type BoardPageParams = {
  board_id: string
}

export const getServerSideProps: GetServerSideProps<BoardPageProps, BoardPageParams> = async (
  context
) => {
  const { params } = context
  if (!params) throw new Error('params of board page is undefined')
  const { board_id } = params

  const boardData = (
    await apiClientImplMock.getBoard({
      topicId: board_id,
    })
  ).board

  return {
    props: {
      boardData,
    },
  }
}

export default BoardPage
