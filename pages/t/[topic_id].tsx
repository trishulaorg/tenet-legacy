import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, PersonaState, UserState } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { Layout } from '../../ui/layouts/Layout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { fetcher } from '../../libs/fetchAPI'
import useSWR from 'swr'

interface ResultT {
  board: {
    title: string
    posts: {
      title: string
      content: string
    }[]
  }
}

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
  query Board($topicId: String!) {
    board(title: $topicId) {
      title,
      posts {
        title,
        content,
      }
    }
  } 
  `
  const { data } = useSWR<ResultT>(document, (document) =>
    fetcher(document, { topicId: topic_id as string }, token)
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (data) {
        setContext(
          new BoardState(0, {
            title: data.board.title,
            description: 'WIP',
            posts: data.board.posts.map(
              (v) =>
                new PostState(v.title, v.content, new PersonaState({ name: 'WIP' }), new Date())
            ),
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
    <div className="bg-gray-600 bg-opacity-5">
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header></Header>
      </HeaderStateContext.Provider>
      <Layout Main={main} Side={() => <div className="max-w-xs">test</div>} />
    </div>
  )
}

export default IndexPage
