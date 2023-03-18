import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PostFormState, PostFormStateContext } from '../../states/PostFormState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { useUserState } from '../../states/UserState'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { PostId } from '@/models/post/PostId'
import type { Post } from '@/models/post/Post'
import type { BoardDescription } from '@/models/board/BoardDescription'

type Props = { postData: Post }

const PostPage: NextPage<Props> = ({ postData }) => {
  const userState = useUserState()
  const router = useRouter()

  const [context, setContext] = useState<BoardState>(new BoardState({}))

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (userState != null) {
        if (userState.personas.length < 1) {
          await router.push('/persona/onboarding')
        }
      }
    }
    f()
  }, [userState, router])

  useEffect(() => {
    setContext(
      new BoardState({
        id: postData.board.id,
        title: postData.board.title,
        description: postData.board.description ?? ('' as BoardDescription),
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
  post_id: PostId
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { params } = context
  if (!params) throw new Error('params is undefined')
  const { post_id } = params
  const postData = await apiClientMockImpl.getPost({
    id: post_id,
  })
  return { props: { postData } }
}

export default PostPage
