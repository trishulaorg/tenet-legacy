import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, BoardType, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { Layout } from '../../ui/layouts/Layout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { fetcher } from '../../libs/fetchAPI'
import useSWR from 'swr'

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  const { topic_id } = router.query
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

  const document = `
  query Board($topicId: Int!) {
    board(id: $topicId) {
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
  const { data } = useSWR<{ board: BoardType }>(document, (document) =>
    fetcher(document, { topicId: Number(topic_id) }, token)
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (data) {
        console.log(data)
        setContext(
          new BoardState(0, {
            title: data.board.title,
            description: 'WIP',
            posts: data.board.posts.map((v) => PostState.fromPostTypeJSON(v)),
          })
        )
      }
    }
    f()
  }, [token, document, data])
  const main: React.FC = () => (
    <>
      <BoardStateContext.Provider value={context}>
        <Board></Board>
      </BoardStateContext.Provider>
    </>
  )
  return (
    <div className="bg-gray-100">
      <UserStateContext.Provider value={user}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header></Header>
        </HeaderStateContext.Provider>
        <Layout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default IndexPage
