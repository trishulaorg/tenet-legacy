import type { ContentType, PrismaClient, User } from '@prisma/client'
import { validationSchema } from '../validation/validationSchema'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../errors/NotAuthenticatedError'
import { defaultNotFoundErrorMessage, NotFoundError } from '../errors/NotFoundError'

const resolversWithoutValidator = {
  Query: {
    me: (_source: never, _args: Record<string, never>, context: ContextType) => {
      return context.me
    },
    persona: (_source: never, args: { name: string }, context: ContextType) => {
      return context.prisma.persona.findFirst({
        where: {
          name: args.name,
        },
      })
    },
    personas: (_source: never, args: { names: string[] }, context: ContextType) => {
      return context.prisma.persona.findMany({
        where: {
          name: {
            in: args.names,
          },
        },
      })
    },
    removeUser: (_source: never, args: Record<string, never>) => {
      console.log(args)
      return false // need to check tokens. wip.
    },
    board: (_source: never, args: { id: number }, context: ContextType) => {
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
    activities: async (_source: never, _args: Record<string, never>, context: ContextType) => {
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
    search: async (_source: never, args: { query: string }, context: ContextType) => {
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
      _source: never,
      args: { screenName: string; name: string; iconPath?: string },
      context: ContextType
    ) => {
      if (!context.me) {
        throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
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
      _source: never,
      args: { title: string; description: string; personaId: number },
      context: ContextType
    ) => {
      if (!context.me) {
        throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
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
        throw new NotFoundError('Invalid persona id')
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
      _source: never,
      args: {
        title: string
        content: string
        contentType: ContentType
        boardId: number
        personaId: number
      },
      context: ContextType
    ) => {
      if (!context.me) {
        throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', args.personaId))
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
      _source: never,
      args: {
        content: string
        contentType: ContentType
        boardId: number
        postId: number
        personaId: number
      },
      context: ContextType
    ) => {
      if (!context.me) {
        throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', args.personaId))
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
      _source: never,
      args: {
        content: string
        contentType: ContentType
        threadId: number
        personaId: number
      },
      context: ContextType
    ) => {
      if (!context.me) {
        throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
      }
      const currentPersona = await context.prisma.persona.findFirst({
        where: { userId: context.me.id, id: args.personaId },
      })
      if (!currentPersona) {
        throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', args.personaId))
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
} as const
export type ResolverType = typeof resolversWithoutValidator

/**
 * fixme: Typing may be improved
 */
function validateArgs<
  T extends typeof resolversWithoutValidator.Query | typeof resolversWithoutValidator.Mutation
>(resolver: T): T {
  const resolverType = (
    Object.keys(resolversWithoutValidator) as (keyof typeof resolversWithoutValidator)[]
  ).find(
    (type) => resolversWithoutValidator[type] === resolver
  ) as keyof typeof resolversWithoutValidator

  return Object.fromEntries(
    Object.entries(resolver).map(([key, resolver]) => {
      const resolverWithValidation: typeof resolver = (
        _: never,
        args: unknown,
        ...rest: ContextType[]
      ) => {
        // @ts-expect-error typescript cannot correctly type mapped object
        validationSchema[resolverType][key].parse(args)
        return resolver.apply(null, [_, args, ...rest])
      }
      return [key, resolverWithValidation] as const
    })
  ) as T
}

/**
 * Add validation to resolversWithoutArgumentValidator
 */
export const resolvers = {
  Query: validateArgs(resolversWithoutValidator.Query),
  Mutation: validateArgs(resolversWithoutValidator.Mutation),
} as typeof resolversWithoutValidator
export type ContextType = {
  me: User | null
  prisma: PrismaClient
}
