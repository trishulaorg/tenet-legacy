import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PostWrapper } from '../../ui/post/PostWrapper'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { PostId } from '@/domain/models/post/PostId'
import type { Post } from '@/domain/models/post/Post'
import { useUserState } from '@/states/UserState'
import { BoardProvider } from '@/states/BoardState'
import type { BoardDescription } from '@/domain/models/board/BoardDescription'
import { PostFormStateProvider } from '@/states/PostFormState'
import { PostFormStateImpl } from '@/infrastructure/states/PostFormStateImpl'

type Props = { postData: Post }

const PostPage: NextPage<Props> = ({ postData }) => {
  const userState = useUserState()
  const router = useRouter()

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

  return (
    <PageContentLayout
      main={
        <BoardProvider
          value={{
            id: postData.board.id,
            title: postData.board.title,
            description: postData.board.description ?? ('' as BoardDescription),
            privilege: {
              deleteSelf: false,
            },
            posts: [postData],
          }}
        >
          <PostFormStateProvider value={new PostFormStateImpl()}>
            <PostWrapper />
          </PostFormStateProvider>
        </BoardProvider>
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
