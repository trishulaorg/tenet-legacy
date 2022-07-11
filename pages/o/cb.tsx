import { GetServerSideProps } from 'next'
import { Header } from '../../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { getGqlToken } from '../../libs/cookies'
import { Layout } from '../../ui/layouts/Layout'
import { getInstance } from '../../libs/auth0'
import { useRouter } from 'next/router'
import { CreateNewBoard } from '../../ui/board/CreateNewBoard'

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.isValidUser && !user.currentPersona) {
          router.push('/onboarding')
        }
      }
    }
    f()
  }, [token, router, user])
  const main: React.FC = () => (
    <>
      <CreateNewBoard></CreateNewBoard>
    </>
  )
  return (
    <div className="bg-gray-100">
      <UserStateContext.Provider value={user}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header></Header>
        </HeaderStateContext.Provider>
        <Layout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
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
