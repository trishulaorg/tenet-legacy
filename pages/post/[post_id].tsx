import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import type { GetServerSideProps, NextPage } from 'next'
import { fetcher, useTenet } from '../../libs/getClient'

type Props = { initialData: any }

const PostPage: NextPage<Props> = ({ initialData }) => {
  const token = getGqlToken()
  const router = useRouter()
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)
  const {
    isReady,
    query: { post_id: rawPostId },
  } = router
  const user = getUser()

  const [context, setContext] = useState<BoardState>(new BoardState({}))

  const postId = isReady && typeof rawPostId === 'string' ? rawPostId : ''
  const { data } = useTenet<{ post: any }>({
    operationName: 'getPost',
    variables: personaId ? { id: postId, personaId } : { id: postId },
    fallbackData: initialData,
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
    }
    f()
  }, [user, router])

  useEffect(() => {
    if (data) {
      setContext(
        data.post.board
          ? new BoardState({
              id: data.post.board.id,
              title: data.post.board.title,
              description: data.post.board.description,
              posts: [data.post].map((v) => PostState.fromPostTypeJSON(v)),
            })
          : new BoardState({})
      )
    }
  }, [token, data])

  return (
    <UserStateContext.Provider value={user}>
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header />
      </HeaderStateContext.Provider>
      <PageContentLayout
        main={
          <BoardStateContext.Provider value={context}>
            <PostFormStateContext.Provider value={new PostFormState({ boardState: context })}>
              <PostWrapper />
            </PostFormStateContext.Provider>
          </BoardStateContext.Provider>
        }
        side={<div className="max-w-xs">test</div>}
      />
    </UserStateContext.Provider>
  )
}

type Params = {
  post_id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { params } = context
  if (!params) throw new Error('params is undefined')
  const { post_id } = params
  const initialData = await fetcher({ operationName: 'getPost', variables: { id: post_id } })
  return { props: { initialData } }
}

export default PostPage
