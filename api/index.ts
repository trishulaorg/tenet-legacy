import { ApolloServer, gql, IResolvers } from 'apollo-server'
import { PrismaClient, User } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/index'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    personas: [Persona]
  }
  type Persona {
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
    threads: [Thread]
  }
  type Thread {
    content: String
    replies: [Reply]
  }
  type Reply {
    content: String
  }
  type Query {
    me: User
    findPersona(name: String!): Persona
    findPersonas(names: [String]!): [Persona]
    removeUser(name: String!): Boolean
    findBoard(title: String!): Board
  }
`

const resolvers: IResolvers<void, ContextType> = {
  Query: {
    me: (_1, _2, context) => {
      return context.me
    },
    findPersona: (_1, args: { name: string }, context) => {
      return context.prisma.persona.findFirst({
        where: {
          name: args.name,
        },
      })
    },
    findPersonas: (_1, args: { names: string[] }, context) => {
      return context.prisma.persona.findMany({
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
        include: {
          posts: {
            include: {
              threads: {
                include: {
                  replies: true,
                },
              },
            },
          },
        },
      })
    },
  },
}

type ContextType = {
  me: User | null
  prisma: typeof prisma
}
type ContextFunction = (args: ExpressContext) => Promise<ContextType>

const context: ContextFunction = async ({ req }) => {
  const token = req.headers.authorization
  let me: User | null = null
  console.log(token)
  if (token && process.env.API_TOKEN_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.API_TOKEN_SECRET) as Record<string, string>
      me = await prisma.user.findFirst({ where: { token: decoded.sub } })
      if (!me) {
        me = await prisma.user.create({
          data: {
            token: decoded.sub,
          },
        })
      }
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
