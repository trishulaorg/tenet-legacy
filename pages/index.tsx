import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { PersonaState, UserState } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { fetchActivities } from '../libs/fetchActivities'

const IndexPage: React.FC = () => {
  let user: UserState | undefined = undefined
  let cookie: string | undefined = undefined
  if (process.browser) {
    cookie = document.cookie
      .split(';')
      .filter((v) => v.trim().startsWith('gqltoken='))[0]
      ?.substring('gqltoken='.length)
    user = cookie ? new UserState(cookie, [], 0) : undefined
  }
  const [activities, setActivities] = useState<PostState[]>([])
  useEffect(() => {
    const f = async (): Promise<void> => {
      const result = await fetchActivities(cookie)
      setActivities(
        result.data.activities.map(
          (v) =>
            new PostState(
              v.title,
              v.content,
              new PersonaState(v.persona.name, v.persona.iconUrl),
              Date.now()
            )
        )
      )
    }
    f()
  }, [cookie])
  return (
    <div>
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header></Header>
      </HeaderStateContext.Provider>
      <ul>
        {activities.map((v, idx) => (
          <ActivityCard key={idx} post={v} />
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  if (!process.env.API_TOKEN_SECRET || !(session && session.user)) {
    return {
      props: {},
    }
  }
  const token = jwt.sign(JSON.stringify(session.user ?? ''), process.env.API_TOKEN_SECRET)
  context.res.setHeader('set-cookie', [`gqltoken=${token}`])
  return {
    props: {},
  }
}

export default IndexPage
