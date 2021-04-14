import { ApolloServer, gql, IResolvers } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

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

type ContextType = ReturnType<typeof context>

const resolvers: IResolvers<void, ContextType> = {
  Query: {
    findUser: (_1, args: { name: string }, context) => {
      return context.prisma.user.findFirst({
        where: {
          name: args.name,
        },
      })
    },
    findUsers: (_1, args: { names: string[] }, context) => {
      return context.prisma.user.findMany({
        where: {
          name: {
            in: args.names,
          },
        },
      })
    },
    removeUser: () => {
      return false // need to check tokens. wip.
    },
    findBoard: (_1, args: { title: string }, context) => {
      return context.prisma.board.findFirst({
        where: {
          title: args.title,
        },
      })
    },
  },
}

const context = () => ({
  prisma: new PrismaClient(),
})

const main: () => void = () => {
  const server = new ApolloServer({ typeDefs, resolvers, context })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
