import React, { useEffect, useState } from 'react'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { makePusher } from '../../libs/usePusher'
import type { Channel } from 'pusher-js'
import type { GetServerSideProps, NextPage } from 'next'
import { useApiClient } from '../../states/ApiClientState'
import type { BoardWithPosts } from '@/domain/models/board/BoardWithPosts'
import type { Board as BoardType } from '@/domain/models/board/Board'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { BoardId } from '@/domain/models/board/BoardId'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { TopicId } from '@/domain/models/board/TopicId'
import type { Post } from '@/domain/models/post/Post'
import { useUserState } from '@/states/UserState'
import { PostFormStateImpl } from '@/infrastructure/states/PostFormStateImpl'
import { BoardProvider } from '@/states/BoardState'
import { PostFormStateProvider } from '@/states/PostFormState'

type BoardPageProps = { boardData: BoardWithPosts }

const BoardPage: NextPage<BoardPageProps> = ({ boardData }) => {
  const router = useRouter()
  const {
    isReady,
    query: { board_id: rawBoardId },
  } = router
  const userState = useUserState()

  const boardId = (isReady && typeof rawBoardId === 'string' ? rawBoardId : '') as BoardId

  const [followingBoardData, setFollowingBoardData] = useState<BoardType[]>()

  const apiClient = useApiClient()

  async function getFollowingBoard(personaId: PersonaId): Promise<void> {
    const data = await apiClient.getFollowingBoard({
      personaId,
    })
    setFollowingBoardData(data)
  }

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (userState == null) {
        return
      }

      if (userState.personas.length < 1) {
        await router.push('/persona/onboarding')
      }

      const pusher = await makePusher()
      const postIds = boardData?.posts.map((post: Post) => post.id) ?? []

      const postChannels: Channel[] = []

      postIds.forEach((postId: string) => {
        if (userState.notifications.every((notification) => notification.channel !== postId)) {
          postChannels.push(pusher.subscribe(postId))
        }
      })

      postChannels.forEach((channel) =>
        userState.subscribeNotifications(channel, 'typing', () => {
          /* no-op */
        })
      )
    }
    f()
  })

  const following = followingBoardData?.some((boardData) => boardId && boardData.id === boardId)

  const onFollowButtonClick = async (): Promise<void> => {
    if (following == null) {
      throw new Error('following is null')
    }
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    const personaId = userState.currentPersona.id
    if (!following) {
      await apiClient.followBoard({
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

  return (
    <PageContentLayout
      main={
        <PostFormStateProvider
          value={
            new PostFormStateImpl({
              boardState: {
                id: boardData.id,
                title: boardData.title,
                description: boardData.description,
              },
            })
          }
        >
          <BoardProvider value={boardData}>
            <Board
              {...(boardId && userState != null
                ? {
                    followButtonType: following ? 'unfollow' : 'follow',
                    onFollowButtonClick,
                  }
                : {})}
              showPostCreate={userState != null}
            />
          </BoardProvider>
        </PostFormStateProvider>
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

  const boardData = await apiClientMockImpl.getBoard({
    // TODO: topicId is board_id?
    topicId: board_id as unknown as TopicId,
  })

  return {
    props: {
      boardData,
    },
  }
}

export default BoardPage
