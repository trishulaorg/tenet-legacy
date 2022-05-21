import { ApolloServer } from 'apollo-server-micro'
import { typeDefs, resolvers, context } from '../../server'

const server = new ApolloServer({ typeDefs, resolvers, context })

export default server.createHandler({ path: '/api/graphql' })
