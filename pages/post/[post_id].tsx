import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { apiHooks } from '../../libs/fetchAPI'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { getSdk } from '../../server/autogen/definition'
import { GraphQLClient } from 'graphql-request'
import type { NextPage } from 'next'

const PostPage: NextPage<{ initialData: any }> = ({ initialData }) => {
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
  const { data } = apiHooks.useGetPost(
    () => postId,
    personaId ? { id: postId, personaId } : { id: postId },
    { fallbackData: initialData }
  )

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
  const main: React.FC = () => (
    <>
      <BoardStateContext.Provider value={context}>
        <PostFormStateContext.Provider value={new PostFormState({ boardState: context })}>
          <PostWrapper />
        </PostFormStateContext.Provider>
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

export async function getServerSideProps(context: any) {
  const client = getSdk(new GraphQLClient('https://coton.vercel.app/api/graphql'))
  const req = await context.req
  const postURL = req.url.toString()
  const postID = postURL.slice(
    postURL.indexOf('post/') + 5
    // postURL.indexOf('.json')
  )
  const initialData = await client.getPost({ id: postID })
  return {
    props: {
      initialData,
    },
  }
}

export default PostPage
