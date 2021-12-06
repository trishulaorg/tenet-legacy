import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, PersonaState, UserState } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { Layout } from '../../ui/layouts/Layout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { fetchAPI } from '../../libs/fetchAPI'

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
  const title = 1 // wip

  const query = `
  query {
    board(title: "${title}") {
      title,
      posts {
        title,
        content,
      }
    }
  } 
  `
  useEffect(() => {
    const f = async (): Promise<void> => {
      const result = await fetchAPI<ResultT>(query, token)
      setContext(
        new BoardState(0, {
          title: result.data.board.title,
          description: 'WIP',
          posts: result.data.board.posts.map(
            (v) => new PostState(v.title, v.content, new PersonaState({ name: 'WIP' }), new Date())
          ),
        })
      )
    }
    f()
  }, [token, query])
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
