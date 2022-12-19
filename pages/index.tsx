import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { CommentInput } from '../ui/thread/CommentInput'
import { fetcher, useTenet } from '../libs/getClient'
import { getGqlToken } from '../libs/cookies'
import { getUser } from '../states/UserState'
import { PostState } from '../states/PostState'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { ActivityCard } from '../ui/home/ActivityCard'

const IndexPage: NextPage<{ initialData: any }> = ({ initialData }) => {
  const [user] = useState(getUser())

  const { data: activitiesData } = useTenet({
    operationName: 'getActivities',
    variables: {},
    token: getGqlToken()!,
    fallbackData: initialData,
  })

  const onSubmit: (comment: string) => void = async (comment: string) => {
    await fetcher({
      operationName: 'createPost',
      variables: {
        title: 'memo',
        content: comment,
        personaId: user.currentPersona?.id ?? -1,
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
              {(activitiesData ? (activitiesData as any)['activities'] : [])
                .map((v: any) => PostState.fromPostTypeJSON(v))
                .map((v: any) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await fetcher({ operationName: 'getActivities', variables: {} })
  return { props: { initialData } }
}

export default observer(IndexPage)
