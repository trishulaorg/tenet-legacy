import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
// @ts-expect-error error of graphql-upload package
import processRequest from 'graphql-upload/processRequest.mjs'
import type { MicroRequest } from 'apollo-server-micro/dist/types'
import type { ServerResponse } from 'http'
import schema from '../../server/graphql-schema/nexus'
import { context } from '../../server'

const cors = Cors()

const apolloServer = new ApolloServer({ schema, context })

const startServer = apolloServer.start()

const handler = async (req: MicroRequest, res: ServerResponse): Promise<void> => {
  if (req.method === 'OPTIONS') {
    res.end()
    return Promise.resolve()
  }
  await startServer
  const contentType = req.headers['content-type']
  if (contentType && contentType.startsWith('multipart/form-data')) {
    req.filePayload = await processRequest(req, res)
  }

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
