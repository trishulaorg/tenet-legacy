import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { getGqlToken } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import { apiHooks } from '../libs/fetchAPI'
import Link from 'next/link'
import { FollowingBoardCard } from '../ui/menu/FollowingBoardCard'
import { swrKey } from '../libs/swrKey'
import { init } from '../libs/initFirebase'
import { isValidAuthInstance } from '../libs/isValidAuthInstance'

const IndexPage: React.FC = () => {
  const [token, setToken] = useState(getGqlToken())
  const [user, setUser] = useState(defaultUser())
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)
  const router = useRouter()

  const { data: activitiesData, mutate } = apiHooks.useGetActivities(
    () => swrKey.useGetActivities(personaId ? { personaId } : undefined),
    {}
  )

  const { data: followingBoardsData } = apiHooks.useGetFollowingBoard(
    () => (personaId ? swrKey.useGetFollowingBoard({ personaId }) : undefined),
    { personaId: personaId ?? 0 }
  )

  useEffect(() => {
    if (token) setUser(new UserState(token, [], 0))
  }, [token])

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.isValidUser && !user.currentPersona) {
          await router.push('/persona/onboarding')
        }
        if (user.currentPersona?.id) {
          setPersonaId(user.currentPersona.id)
        }
      }
    }
    f()
  }, [token, router, user])
  useEffect(() => {
    if (token) {
      mutate()
    }
  }, [token, mutate])
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ;(async () => {
      const r = init()
      const { auth } = r
      if (!isValidAuthInstance(auth) || !auth.currentUser) return
      const localToken = jwt.sign(
        { uid: auth.currentUser.uid },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env['NEXT_PUBLIC_API_TOKEN_SECRET']!
      )
      document.cookie = `gqltoken=${localToken}`
      setToken(localToken)
    })()
  })
  const main: React.FC = () => (
    <>
      <ul>
        {(activitiesData?.activities ?? [])
          .map((v) => PostState.fromPostTypeJSON(v))
          .map((v) => (
            <ActivityCard key={v.id} post={v} />
          ))}
      </ul>
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <PostFormStateContext.Provider value={new PostFormState({})}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout
            Main={main}
            Side={() => (
              <div className="w-56">
                <FollowingBoardCard boards={followingBoardsData?.getFollowingBoard ?? []} />
                <div className="rounded overflow-hidden my-2 py-2 text-fontcl-heavy">
                  <Link href="/tos">Terms of Service</Link>
                </div>
              </div>
            )}
          />
        </PostFormStateContext.Provider>
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export default IndexPage
