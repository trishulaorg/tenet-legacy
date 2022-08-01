// @ts-expect-error we need side effect
import { GetServerSideProps } from 'next'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { fetchActivities } from '../libs/fetchActivities'
import { getGqlToken } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { getInstance } from '../libs/auth0'
import { useRouter } from 'next/router'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)

  const [activities, setActivities] = useState<PostState[]>([])
  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.isValidUser && !user.currentPersona) {
          await router.push('/onboarding')
        }
      }
    }
    f()
  }, [token, router, user])
  useEffect(() => {
    const f = async (): Promise<void> => {
      const result = await fetchActivities(token)
      setActivities(result.activities.map((v) => PostState.fromPostTypeJSON(v)))
    }
    f()
  }, [token])
  const main: React.FC = () => (
    <>
      <ul>
        {activities.map((v) => (
          <ActivityCard key={v.id} post={v} />
        ))}
      </ul>
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header />
        </HeaderStateContext.Provider>
        <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getInstance().getSession(context.req, context.res)
  if (!process.env['API_TOKEN_SECRET'] || !(session && session.user)) {
    return {
      props: {},
    }
  }
  const token = jwt.sign(JSON.stringify(session.user ?? ''), process.env['API_TOKEN_SECRET'])
  context.res.setHeader('set-cookie', [`gqltoken=${token}`])
  return {
    props: {},
  }
}

export default IndexPage
