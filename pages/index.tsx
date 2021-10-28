import { GetServerSideProps } from 'next'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { PersonaState, UserState } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { fetchActivities } from '../libs/fetchActivities'
import { Layout } from '../ui/layouts/Layout'
import { HomeTabList } from '../ui/home/HomeTabList'
import { HomeTab } from '../ui/home/HomeTab'
import { getInstance } from '../libs/auth0'

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
    <div className="bg-gray-600 bg-opacity-5">
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header></Header>
      </HeaderStateContext.Provider>
      <Layout
        Main={() => (
          <>
            <HomeTabList>
              <HomeTab onClick={() => console.log('someReceiverWeWillDefine')} selected={true}>
                Home
              </HomeTab>
              <HomeTab onClick={() => console.log('someReceiverWeWillDefine')} selected={false}>
                Activities
              </HomeTab>
              <HomeTab onClick={() => console.log('someReceiverWeWillDefine')} selected={false}>
                Hot Topics
              </HomeTab>
            </HomeTabList>
            <ul>
              {activities.map((v, idx) => (
                <ActivityCard key={idx} post={v} />
              ))}
            </ul>
          </>
        )}
        Side={() => <div className="max-w-xs">test</div>}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getInstance().getSession(context.req, context.res)
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
