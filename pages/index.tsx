import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { CommentInput } from '../ui/thread/CommentInput'
import { fetcher } from '../libs/getClient'
import { getUser } from '../states/UserState'
import type { PostType } from '../states/PostState'
import { PostState } from '../states/PostState'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { ActivityCard } from '../ui/home/ActivityCard'
import { apiClientImpl } from '../states/ApiClientState'

type Props = {
  activities: PostType[]
}

const IndexPage: NextPage<Props> = ({ activities }) => {
  const [user] = useState(getUser())

  const onSubmit: (comment: string) => void = async (comment: string) => {
    await fetcher({
      operationName: 'createPost',
      variables: {
        title: 'memo',
        content: comment,
        personaId: user.currentPersona?.id,
      },
      token: user.token,
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const activities = await apiClientImpl.getActivities()
  return { props: { activities } }
}

export default observer(IndexPage)
