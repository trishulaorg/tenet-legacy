import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { UserStateContext, getUser } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { getCookies, getGqlToken } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import Link from 'next/link'
import { init } from '../libs/initFirebase'
import { isValidAuthInstance } from '../libs/isValidAuthInstance'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import { CommentInput } from '../ui/thread/CommentInput'
import { fetcher, useTenet } from '../libs/getClient'

const IndexPage: NextPage<{ initialData: any }> = ({ initialData }) => {
  const [user] = useState(getUser())
  const [, setPersonaId] = useState<number | undefined>(undefined)
  const router = useRouter()

  const { data: activitiesData } = useTenet({
    operationName: 'getActivities',
    variables: {},
    token: getGqlToken()!,
    fallbackData: initialData,
  })

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
  })
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ;(async () => {
      const r = init()
      const { auth } = r
      if (!isValidAuthInstance(auth) || !auth.currentUser) return
      if (getCookies().has('gqltoken') && getCookies().get('gqltoken') !== '') {
        user.token = getCookies().get('gqltoken') ?? ''
        return
      }
      const localToken = jwt.sign(
        { uid: auth.currentUser.uid },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env['NEXT_PUBLIC_API_TOKEN_SECRET']!
      )
      document.cookie = `gqltoken=${localToken}`
      user.token = localToken
    })()
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
    <UserStateContext.Provider value={user}>
      <PostFormStateContext.Provider value={new PostFormState({})}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header />
        </HeaderStateContext.Provider>
        <PageContentLayout
          main={
            <div>
              <CommentInput onSubmit={onSubmit} />
              <ul>
                {(activitiesData ? (activitiesData as any)['activities'] : [])
                  .map((v: any) => PostState.fromPostTypeJSON(v))
                  .map((v: any) => (
                    <li key={v.id}>
                      <ActivityCard post={v} />
                    </li>
                  ))}
              </ul>
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
      </PostFormStateContext.Provider>
    </UserStateContext.Provider>
  )
}

export async function getStaticProps() {
  const initialData = await fetcher({ operationName: 'getActivities', variables: {} })
  return {
    props: {
      initialData,
    },
  }
}

export default observer(IndexPage)
