import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    name: String
    iconUrl: String
  }
  type Board {
    title: String
    posts: [Post]
  }
  type Post {
    title: String
    content: String
  }
  type Query {
    findUser(name: String!): User
    findUsers(names: [String]!): [User]
    removeUser(name: String!): Boolean
    findBoard(title: String!): Board
  }
`

const resolvers = {
  Query: {
    findUser: (name: string) => {
      return prisma.user.findFirst({
        where: {
          name,
        },
      })
    },
    findUsers: (names: string[]) => {
      return prisma.user.findMany({
        where: {
          name: {
            in: names,
          },
        },
      })
    },
    removeUser: (name: string) => {
      name
      return false // need to check tokens. wip.
    },
    findBoard: (title: string) => {
      return prisma.board.findFirst({
        where: {
          title,
        },
      })
    },
  },
}

const main: () => void = () => {
  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
