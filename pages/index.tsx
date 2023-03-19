import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { observer } from 'mobx-react'
import { CommentInput } from '../ui/thread/CommentInput'
import { useUserState } from '../states/UserState'
import { PostState } from '../states/PostState'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { ActivityCard } from '../ui/home/ActivityCard'
import { useApiClient } from '../states/ApiClientState'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { Activity } from '@/models/activity/Activity'
import type { PostTitle } from '@/models/post/PostTitle'
import type { PostContent } from '@/models/post/PostContent'
import type { BoardId } from '@/models/board/BoardId'

type Props = {
  activities: Activity[]
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
          <PostFormStateContext.Provider value={new PostFormState({})}>
            <ul>
              {activities
                .map((v: Activity) => PostState.fromPostTypeJSON(v))
                .map((v: PostState) => (
                  <li key={v.id}>
                    <ActivityCard post={v} />
                  </li>
                ))}
            </ul>
          </PostFormStateContext.Provider>
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
  const activities: Activity[] = await apiClientMockImpl.getActivities()
  return { props: { activities } }
}

export default observer(IndexPage)
