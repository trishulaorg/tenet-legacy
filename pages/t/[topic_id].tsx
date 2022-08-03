import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, BoardType, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { fetcher } from '../../libs/fetchAPI'
import useSWR from 'swr'
import { gql } from 'graphql-request'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'

const getBoardDocument = gql`
  query Board($topicId: Int!) {
    board(id: $topicId) {
      id
      title
      posts {
        id
        boardId
        title
        content
        createdAt
        persona {
          name
          iconUrl
        }
        threads {
          id
          content
          createdAt
          persona {
            name
            iconUrl
          }
          replies {
            createdAt
            id
            content
            persona {
              name
              iconUrl
            }
          }
        }
      }
    }
  }
`

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  const {
    isReady,
    query: { topic_id },
  } = router
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)
  const [context, setContext] = useState<BoardState>(new BoardState())

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
      }
    }
    f()
  }, [token, router, user])

  const { data } = useSWR<{ board: BoardType }>(
    () => (isReady ? getBoardDocument : null),
    (document) => fetcher(document, { topicId: Number(topic_id) }, token)
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (data) {
        setContext(
          new BoardState(data.board.id, {
            title: data.board.title,
            description: data.board.description,
            posts: data.board.posts.map((v) => PostState.fromPostTypeJSON(v)),
          })
        )
      }
    }
    f()
  }, [token, data])
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
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header />
        </HeaderStateContext.Provider>
        <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export { getBoardDocument }
export default IndexPage
