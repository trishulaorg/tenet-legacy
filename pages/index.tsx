import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React from 'react'

const IndexPage: React.FC<{ token?: string }> = () => {
  return (
    <div>
      <HeaderStateContext.Provider value={new HeaderState()}>
        <Header></Header>
      </HeaderStateContext.Provider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ token?: string }> = async (context) => {
  const session = await getSession(context.req, context.res)
  if (!process.env.API_TOKEN_SECRET) {
    return {
      props: {
        token: undefined,
      },
    }
  }
  return {
    props: {
      token: jwt.sign(JSON.stringify(session?.user), process.env.API_TOKEN_SECRET),
    },
  }
}

export default IndexPage
