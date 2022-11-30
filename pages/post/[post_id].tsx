import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { apiHooks, setAuthToken } from '../../libs/fetchAPI'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { getSdk } from '../../server/generated-files/frontend-graphql-definition'
import { GraphQLClient } from 'graphql-request'
import { NextPage } from 'next'

const PostPage: NextPage<{ initialData: any }> = ({ initialData }) => {
  const token = getGqlToken()
  const router = useRouter()
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)
  const {
    isReady,
    query: { post_id: rawPostId },
  } = router
  let user = defaultUser()
  if (token) {
    setAuthToken(token)
    user = new UserState(token, [], 0)
  }

  const contentGraphqlQueryDocument = queryDocuments.Query.post

  const [context, setContext] = useState<BoardState>(
    new BoardState('', contentGraphqlQueryDocument)
  )

  const postId = isReady && typeof rawPostId === 'string' ? rawPostId : ''
  const { data, mutate } = apiHooks.useGetPost(
    () => postId,
    personaId ? { id: postId, personaId } : { id: postId },
    { initialData } as any
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.currentPersona?.id) {
          setPersonaId(user.currentPersona.id)
          await mutate()
        }
      }
      if (token) {
        setAuthToken(token)
      }
    }
    f()
  }, [token, router, user, mutate])

  useEffect(() => {
    if (data) {
      setContext(
        new BoardState(data.post.board.id, contentGraphqlQueryDocument, {
          title: data.post.board.title,
          description: data.post.board.description,
          posts: [data.post].map((v) => PostState.fromPostTypeJSON(v)),
        })
      )
    }
  }, [token, data, contentGraphqlQueryDocument])
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
  var postURL = req.url.toString()
  const postID = postURL.slice(
    postURL.indexOf('post/') + 5,
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
