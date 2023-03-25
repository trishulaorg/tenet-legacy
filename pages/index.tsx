import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { observer } from 'mobx-react'
import { CommentInput } from '../ui/thread/CommentInput'
import { useUserState } from '../states/UserState'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { ActivityCard } from '../ui/home/ActivityCard'
import { useApiClient } from '../states/ApiClientState'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { PostTitle } from '@/domain/models/post/PostTitle'
import type { PostContent } from '@/domain/models/post/PostContent'
import type { BoardId } from '@/domain/models/board/BoardId'
import { PostFormStateProvider } from '@/states/PostFormState'
import type { Post } from '@/domain/models/post/Post'
import { PostFormStateImpl } from '@/infrastructure/states/PostFormStateImpl'

type Props = {
  activities: Post[]
}

const IndexPage: NextPage<Props> = ({ activities }) => {
  const apiClient = useApiClient()
  const userState = useUserState()

  const onSubmit = async (comment: PostContent): Promise<void> => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    await apiClient.createPost({
      title: 'memo' as PostTitle,
      content: comment,
      personaId: userState.currentPersona.id,
      boardId: '' as BoardId,
    })
  }

  return (
    <PageContentLayout
      main={
        <div>
          <CommentInput onSubmit={onSubmit} />
          <PostFormStateProvider value={new PostFormStateImpl()}>
            <ul>
              {activities.map((post: Post) => (
                <li key={post.id}>
                  <ActivityCard post={post} />
                </li>
              ))}
            </ul>
          </PostFormStateProvider>
        </div>
      }
      side={
        <div className="w-56">
          {/* <FollowingBoardCard boards={followingBoardsData?.getFollowingBoard ?? []} /> */}
          <div className="rounded overflow-hidden my-2 py-2 text-high dark:text-high-dark">
            <Link href="/tos">Terms of Service</Link>
          </div>
        </div>
      }
    />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const activities: Post[] = await apiClientMockImpl.getActivities()
  return { props: { activities } }
}

export default observer(IndexPage)
