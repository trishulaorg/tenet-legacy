import { ApolloServer } from 'apollo-server-micro'
import { typeDefs, resolvers, context } from '../../server'
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

const startServer = apolloServer.start()

export default cors(async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
