import { ApolloServer } from 'apollo-server-micro'
import { context } from '../../server'
import Cors from 'micro-cors'
import type { RequestHandler } from 'micro'
import { typeDefs } from '../../server/graphql-schema/typeDefs'
import { resolvers } from '../../server/graphql-schema/resolvers'

const cors = Cors()

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

const startServer = apolloServer.start()

const handler: RequestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  return await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export default cors(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
