import { ApolloServer, gql } from 'apollo-server'
import { ContentType, PrismaClient, User } from '@prisma/client'
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
    persona: Persona
  }
  type Thread {
    content: String
    replies: [Reply]
    persona: Persona
  }
  type Reply {
    content: String
    persona: Persona
  }
  enum ContentType {
    TEXT
    LINK
    IMAGE
    VIDEO
    EMOJI
  }
  type Query {
    me: User
    persona(name: String!): Persona
    personas(names: [String]!): [Persona]
    removeUser(name: String!): Boolean
    board(title: String!): Board
    activities: [Post]
  }
  type Mutation {
    createPersona(name: String!, iconPath: String): Persona
    createBoard(title: String!, description: String!): Board
    createPost(
      title: String!
      content: String!
      contentType: String!
      personaId: ID!
      boardId: ID!
    ): Post
    createThread(
      title: String!
      content: String!
      contentType: ContentType!
      boardId: ID!
      postId: ID!
    ): Thread
    createReply(title: String!, content: String!, contentType: ContentType!, threadId: ID!): Reply
  }
`

type IResolver<Root = unknown, Context = unknown, Args = unknown, ResultT = unknown> = (
  parent: Root,
  args: Args,
  context: Context
) => ResultT

type IResolvers<Context> = {
  Query: Record<string, IResolver<any, Context, any, any>>
  Mutation: Record<string, IResolver<any, Context, any, any>>
}

const resolvers: IResolvers<ContextType> = {
  Query: {
    me: (_1, _2, context) => {
      return context.me
    },
    persona: (_1, args: { name: string }, context) => {
      return context.prisma.persona.findFirst({
        where: {
          name: args.name,
        },
      })
    },
    personas: (_1, args: { names: string[] }, context) => {
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
    board: (_1, args: { title: string }, context) => {
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
    activities: (_1, _2, context) => {
      return context.prisma.post.findMany({
        include: {
          persona: true,
        },
      })
    },
  },
  Mutation: {
    createPersona: (_1, args: { name: string; iconPath?: string }, context) => {
      if (!context.me) {
        return
      }
      return context.prisma.persona.create({
        data: {
          userId: context.me.id,
          name: args.name,
          iconUrl: args.iconPath ?? 'http://example.com',
        },
      })
    },
    createBoard: async (
      _1,
      args: { title: string; description: string; personaId: number },
      context
    ) => {
      if (!context.me) {
        return
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        return
      }
      return context.prisma.board.create({
        data: {
          title: args.title,
          description: args.description,
          moderators: {
            connect: {
              id: currentPersona.id,
            },
          },
        },
      })
    },
    createPost: async (
      _1,
      args: {
        title: string
        content: string
        contentType: ContentType
        boardId: number
        personaId: number
      },
      context
    ) => {
      if (!context.me) {
        return
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        return
      }
      return context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          contentType: args.contentType,
          persona: {
            connect: {
              id: currentPersona.id,
            },
          },
          board: {
            connect: {
              id: args.boardId,
            },
          },
        },
      })
    },
    createThread: async (
      _1,
      args: {
        title: string
        content: string
        contentType: ContentType
        boardId: number
        postId: number
        personaId: number
      },
      context
    ) => {
      if (!context.me) {
        return
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        return
      }
      return context.prisma.thread.create({
        data: {
          content: args.content,
          contentType: args.contentType,
          persona: {
            connect: {
              id: args.personaId,
            },
          },
          board: {
            connect: {
              id: args.boardId,
            },
          },
          Post: {
            connect: {
              id: args.postId,
            },
          },
        },
      })
    },
    createReply: async (
      _1,
      args: {
        title: string
        content: string
        contentType: ContentType
        threadId: number
        personaId: number
      },
      context
    ) => {
      if (!context.me) {
        return
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        return
      }
      return context.prisma.reply.create({
        data: {
          content: args.content,
          contentType: args.contentType,
          persona: {
            connect: {
              id: args.personaId,
            },
          },
          thread: {
            connect: {
              id: args.threadId,
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
  const token = req.headers.authorization?.substring('Bearer '.length)
  let me: User | null = null
  if (token && process.env.API_TOKEN_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.API_TOKEN_SECRET) as Record<string, string>
      me = await prisma.user.findFirst({
        where: { token: decoded.sub },
        include: { personas: true },
      })
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
  server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
