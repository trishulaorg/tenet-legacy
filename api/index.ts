import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    name: String
    iconUrl: String
  }
  type Query {
    users: [User]
  }
`

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
}

const main: () => void = () => {
  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
