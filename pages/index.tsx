import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { UserState } from '../states/UserState'
import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'

const IndexPage: React.FC<{ token: string }> = ({ token }) => {
  return (
    <div>
      <Header user={new UserState(token)}></Header>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getSession(context.req, context.res)
  console.log(token?.idToken)
  if (!process.env.API_TOKEN_SECRET) return { props: {} }
  return {
    props: {
      token: jwt.sign(JSON.stringify(token?.user), process.env.API_TOKEN_SECRET),
    },
  }
}

export default IndexPage
