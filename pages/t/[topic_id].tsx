import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, PersonaState, UserState, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { Layout } from '../../ui/layouts/Layout'
import { useRouter } from 'next/router'
import { Board } from '../../ui/board/Board'
import { fetcher } from '../../libs/fetchAPI'
import useSWR from 'swr'

interface ResultT {
  board: {
    id: number
    title: string
    posts: {
      id: number
      boardId: number
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
  query Board($topicId: Int!) {
    board(id: $topicId) {
      posts {
        id
        boardId
        title
        content
        persona {
          name
          iconUrl
        }
        threads {
          id
          content
          persona {
            name
            iconUrl
          }
          replies {
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
  const { data } = useSWR<ResultT>(document, (document) =>
    fetcher(document, { topicId: Number(topic_id) }, token)
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (data) {
        setContext(
          new BoardState(0, {
            title: data.board.title,
            description: 'WIP',
            posts: data.board.posts.map(
              (v: any) =>
                new PostState(
                  v.id,
                  v.boardId,
                  v.title,
                  v.content,
                  new PersonaState({
                    id: v.persona.id,
                    name: v.persona.name,
                    iconUrl: v.persona.iconUrl,
                    screenName: v.persona.screenName,
                  }),
                  Date.now(),
                  0,
                  0,
                  v.threads.map(
                    (w: any) =>
                      new PostState(
                        w.id,
                        v.boardId,
                        '',
                        w.content,
                        new PersonaState({
                          id: -1,
                          name: w.persona.name,
                          screenName: w.persona.screenName,
                        }),
                        Date.now(),
                        0,
                        0,
                        w.replies.map(
                          (x: any) =>
                            new PostState(
                              x.id,
                              v.boardId,
                              '',
                              x.content,
                              new PersonaState({
                                id: -1,
                                name: x.persona.name,
                                screenName: x.persona.screenName,
                              }),
                              Date.now(),
                              0,
                              0
                            )
                        )
                      )
                  )
                )
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
