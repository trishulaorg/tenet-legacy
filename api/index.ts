import { ApolloServer, gql, IResolvers } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/index'

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
    me: User
    findUser(name: String!): User
    findUsers(names: [String]!): [User]
    removeUser(name: String!): Boolean
    findBoard(title: String!): Board
  }
`

type Unpromisify<T> = T extends Promise<infer U> ? U : T
type ContextType = Unpromisify<ReturnType<typeof context>>

const resolvers: IResolvers<void, ContextType> = {
  Query: {
    me: (_1, _2, context) => {
      return context.me
    },
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

const context = async ({req}: ExpressContext) => {
  const prisma = new PrismaClient()
  const token = req.headers.authorization
  const me = await prisma.user.findFirst({
    where: {
      token
    }
  })
  return {
    me,
    prisma,
  }
}

const main: () => void = () => {
  const server = new ApolloServer({ typeDefs, resolvers, context })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
