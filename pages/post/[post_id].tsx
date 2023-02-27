import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getUser } from '../../states/UserState'
import type { PostType } from '../../states/PostState'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { apiClientImplMock } from '../../states/ApiClientState'

type Props = { postData: PostType }

const PostPage: NextPage<Props> = ({ postData }) => {
  const user = getUser()
  const router = useRouter()

  const [context, setContext] = useState<BoardState>(new BoardState({}))

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user.token !== 'INVALID_TOKEN' && !user.requested) {
        await user.request()
        if (user.personas.length < 1) {
          await router.push('/persona/onboarding')
        }
      }
    }
    f()
  }, [user, router])

  useEffect(() => {
    setContext(
      new BoardState({
        id: postData.board.id,
        title: postData.board.title,
        description: postData.board.description,
        posts: [PostState.fromPostTypeJSON(postData)],
      })
    )
  }, [postData])

  return (
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
  )
}

type Params = {
  post_id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { params } = context
  if (!params) throw new Error('params is undefined')
  const { post_id } = params
  const postData = (
    await apiClientImplMock.getPost({
      id: post_id,
    })
  ).post
  return { props: { postData } }
}

export default PostPage
