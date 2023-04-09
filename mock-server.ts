import { ApolloServer } from '@apollo/server'
import { addMocksToSchema } from '@graphql-tools/mock'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { startStandaloneServer } from '@apollo/server/standalone'
import { join } from 'path'
import { aQuery } from '@/src/generated/mocks'

const schema = loadSchemaSync(join(__dirname, './schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const server = new ApolloServer({
  // addMocksToSchema accepts a schema instance and provides
  // mocked data for each field in the schema
  schema: addMocksToSchema({
    schema,
    resolvers: {
      Query: aQuery(),
    },
  }),
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`)
})
