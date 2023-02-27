import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { observer } from 'mobx-react'
import { CommentInput } from '../ui/thread/CommentInput'
import { useUserState } from '../states/UserState'
import type { PostType } from '../states/PostState'
import { PostState } from '../states/PostState'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { ActivityCard } from '../ui/home/ActivityCard'
import { apiClientImplMock, useApiClient } from '../states/ApiClientState'

type Props = {
  activities: PostType[]
}

const IndexPage: NextPage<Props> = ({ activities }) => {
  const apiClient = useApiClient()
  const userState = useUserState()

  const onSubmit: (comment: string) => void = async (comment: string) => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    await apiClient.createPost({
      title: 'memo',
      content: comment,
      personaId: Number(userState.currentPersona.id),
      boardId: '',
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
                .map((v: PostType) => PostState.fromPostTypeJSON(v))
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
  const activities: PostType[] = (await apiClientImplMock.getActivities()).activities
  return { props: { activities } }
}

export default observer(IndexPage)
