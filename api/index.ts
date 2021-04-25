import { ApolloServer, gql, IResolvers } from 'apollo-server'
import { PrismaClient, User } from '@prisma/client'
import { AuthenticationError, ExpressContext } from 'apollo-server-express/dist/index'
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET_KEY ?? 'TEST'

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
  type UserToken {
    value: String!
  }
  type Query {
    me: User
    auth(name: String!): UserToken
    findUser(name: String!): User
    findUsers(names: [String]!): [User]
    removeUser(name: String!): Boolean
    findBoard(title: String!): Board
  }
`

const resolvers: IResolvers<void, ContextType> = {
  Query: {
    me: (_1, _2, context) => {
      return context.me
    },
    auth: async (_1, args: { name: string }, context) => {
      const user = await context.prisma.user.findFirst({
        where: {
          name: args.name,
        },
      })
      if (user) {
        return { value: jwt.sign({ userId: user.id }, tokenSecret) }
      }
      throw new AuthenticationError('Given name was invalid.')
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

interface DecodedToken {
  userId: number
}

type ContextType = {
  me: User | null
  prisma: typeof prisma
}
type ContextFunction = (args: ExpressContext) => Promise<ContextType>

const context: ContextFunction = async ({ req }) => {
  const token = req.headers.authorization
  let me: User | null = null
  if (token) {
    try {
      const decoded = jwt.verify(token, tokenSecret) as DecodedToken
      me = await prisma.user.findFirst({
        where: {
          id: decoded.userId,
        },
      })
    } catch {
      // do nothing. just ignore it.
    }
  }

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
