import { gql } from 'apollo-server-micro'
import { ContentType, PrismaClient, User } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { IExecutableSchemaDefinition } from '@graphql-tools/schema'

dotenv.config()

const prisma = new PrismaClient()

export const typeDefs = gql`
  scalar Date
  type User {
    personas: [Persona]
  }
  type Persona {
    id: Int
    name: String
    screenName: String
    iconUrl: String
  }
  type Board {
    id: Int
    title: String
    posts: [Post]
    createdAt: Date
  }
  type Post {
    id: Int
    boardId: Int
    title: String
    content: String
    threads: [Thread]
    persona: Persona
    createdAt: Date
  }
  type Thread {
    id: Int
    boardId: Int
    content: String
    replies: [Reply]
    persona: Persona
    createdAt: Date
  }
  type Reply {
    id: Int
    boardId: Int
    content: String
    persona: Persona
    createdAt: Date
  }
  enum ContentType {
    TEXT
    LINK
    IMAGE
    VIDEO
    EMOJI
  }
  type SearchResult {
    kind: String
    id: Int
    title: String
  }
  type Query {
    me: User
    persona(name: String!): Persona
    personas(names: [String]!): [Persona]
    removeUser(name: String!): Boolean
    board(id: Int!): Board
    activities: [Post]
    search(query: String!): [SearchResult]
  }
  type Mutation {
    createPersona(screenName: String!, name: String!, iconPath: String): Persona
    createBoard(title: String!, description: String!, personaId: Int!): Board
    createPost(
      title: String!
      content: String!
      contentType: String!
      personaId: Int!
      boardId: Int!
    ): Post
    createThread(
      title: String!
      content: String!
      contentType: ContentType!
      boardId: Int!
      postId: Int!
      personaId: Int!
    ): Thread
    createReply(
      title: String!
      content: String!
      contentType: ContentType!
      threadId: Int!
      personaId: Int!
    ): Reply
  }
`

export const resolvers: Exclude<IExecutableSchemaDefinition<ContextType>['resolvers'], undefined> =
  {
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
      board: (_1, args: { id: number }, context) => {
        return context.prisma.board.findFirst({
          where: {
            id: args.id,
          },
          include: {
            posts: {
              include: {
                persona: true,
                threads: {
                  include: {
                    persona: true,
                    replies: {
                      include: {
                        persona: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        })
      },
      activities: async (_1, _2, context) => {
        return context.prisma.post.findMany({
          include: {
            persona: true,
            threads: {
              include: {
                persona: true,
                replies: {
                  include: {
                    persona: true,
                  },
                },
              },
            },
          },
        })
      },
      search: async (_1, args: { query: string }, context) => {
        const result = await context.prisma.board.findMany({
          where: {
            title: {
              startsWith: args.query,
            },
          },
        })
        return result.map((x) => ({
          kind: 'board',
          title: x.title,
          id: x.id,
        }))
      },
    },
    Mutation: {
      createPersona: (
        _1,
        args: { screenName: string; name: string; iconPath?: string },
        context
      ) => {
        if (!context.me) {
          return
        }
        return context.prisma.persona.create({
          data: {
            userId: context.me.id,
            name: args.name,
            iconUrl: args.iconPath ?? 'http://example.com',
            screenName: args.screenName,
          },
        })
      },
      createBoard: async (
        _1,
        args: { title: string; description: string; personaId: number },
        context
      ) => {
        if (!context.me) {
          throw new Error('User is not authorized')
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: {
            user: {
              id: context.me.id,
            },
            id: args.personaId,
          },
        })
        if (!currentPersona) {
          throw new Error('Invalid persona id')
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

export const context: ContextFunction = async ({ req }) => {
  const token = req.headers.authorization?.substring('Bearer '.length)
  let me: User | null = null
  if (token && process.env['API_TOKEN_SECRET']) {
    try {
      const decoded = jwt.verify(token, process.env['API_TOKEN_SECRET'])
      if (typeof decoded === 'string' || typeof decoded.sub === 'undefined') {
        throw new Error('invalid auth token')
      }
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
      // do nothing. just ignore for now.
    }
  }

  return {
    me,
    prisma,
  }
}
