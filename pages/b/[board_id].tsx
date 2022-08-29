import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { apiHooks, setAuthToken } from '../../libs/fetchAPI'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { makePusher } from '../../libs/usePusher'
import type { Channel } from 'pusher-js'

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  const {
    isReady,
    query: { board_id: rawBoardId },
  } = router
  let user: UserState | undefined
  if (!user) {
    user = defaultUser()
  }
  if (token) {
    setAuthToken(token)
    user = new UserState(token, [], 0)
  }
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)

  const contentGraphqlQueryDocument = queryDocuments.Query.board

  const [context, setContext] = useState<BoardState>(
    new BoardState('', contentGraphqlQueryDocument)
  )
  const boardId = isReady && typeof rawBoardId === 'string' ? rawBoardId : ''

  const { data, mutate } = apiHooks.useGetBoard(
    () => boardId,
    personaId
      ? {
          topicId: boardId,
          personaId,
        }
      : { topicId: boardId }
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.currentPersona?.id !== personaId) {
          setPersonaId(user.currentPersona?.id)
          mutate()
        }
      }

      const pusher = await makePusher()
      const postIds = data?.board.posts.map((post) => post.id) ?? []

      const postChannels: Channel[] = []

      postIds.forEach((postId) => {
        if (user?.notifications.every((notification) => notification.channel !== postId)) {
          postChannels.push(pusher.subscribe(postId))
        }
      })

      postChannels.forEach((channel) =>
        user?.subscribeNotifications(channel, 'typing', (data) => {
          console.log(data)
          /* no-op */
        })
      )
    }
    f()
  }, [token, router, user, data?.board.posts])

  useEffect(() => {
    if (data) {
      setContext(
        new BoardState(data.board.id, contentGraphqlQueryDocument, {
          title: data.board.title,
          description: data.board.description,
          posts: data.board.posts.map((v) => PostState.fromPostTypeJSON(v)),
        })
      )
    }
  }, [token, data, contentGraphqlQueryDocument])
  const main: React.FC = () => (
    <>
      <BoardStateContext.Provider value={context}>
        <Board />
      </BoardStateContext.Provider>
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <PostFormStateContext.Provider value={new PostFormState({})}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
        </PostFormStateContext.Provider>
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export default IndexPage
