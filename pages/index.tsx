import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React from 'react'
import { UserState } from '../states/UserState'

const IndexPage: React.FC = () => {
  let user: UserState | undefined = undefined
  if (process.browser) {
    const cookie = document.cookie
      .split(';')
      .filter((v) => v.trim().startsWith('gqltoken='))[0]
      ?.substring('gqltoken='.length)
    user = cookie ? new UserState(cookie, [], 0) : undefined
  }
  return (
    <div>
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header></Header>
      </HeaderStateContext.Provider>
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
