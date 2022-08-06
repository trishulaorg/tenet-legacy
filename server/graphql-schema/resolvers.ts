import type { ContentType, PrismaClient, User } from '@prisma/client'
import { validationSchema } from '../validation/validationSchema'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../errors/NotAuthenticatedError'
import { defaultNotFoundErrorMessage, NotFoundError } from '../errors/NotFoundError'
import { ulid } from 'ulid'
import { uploadFileToS3 } from '../fileUpload/s3Handler'
import type { Upload } from 'graphql-upload'
import { NotAuthorizedError } from '../errors/NotAuthorizedError'
import { BadRequestError } from '../errors/BadRequest/BadRequestError'

export const resolversWithoutValidator = {
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
    post: (_source: never, args: { id: string }, context: ContextType) => {
      return context.prisma.post.findFirst({
        where: {
          id: args.id,
        },
        include: {
          board: true,
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
    board: (_source: never, args: { id: string }, context: ContextType) => {
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
          board: true,
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
          id: ulid(),
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
        boardId: string
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
          id: ulid(),
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
        boardId: string
        postId: string
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
          id: ulid(),
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
        threadId: string
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
          id: ulid(),
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
    setPersonaIcon: async (
      _source: never,
      {
        file,
        personaId,
      }: {
        file: Upload
        personaId: number
      },
      context: ContextType
    ) => {
      const persona = context.prisma.persona.findFirst({
        where: {
          id: personaId,
        },
        select: {
          user: true,
        },
      })
      const fileObject = await file.file
      if (typeof context.me?.id === 'undefined' || context.me.id < 1) {
        throw new NotAuthenticatedError('Not Authenticated.')
      }
      if (context.me.id !== (await persona.user())?.id) {
        throw new NotAuthorizedError('You do not have permission to edit Persona of the User.')
      }
      if (typeof fileObject === 'undefined') {
        throw new BadRequestError('No file data is supplied.')
      }

      const filenameMatch = fileObject.filename.match(/^.*\.(jpg|png|svg|bmp)$/i)
      if (!filenameMatch) {
        throw new BadRequestError('Please upload Image file.')
      }
      const [, fileExtension] = filenameMatch
      const fileKey = `personaIcon/${ulid()}.${fileExtension}`

      const { createReadStream, mimetype } = fileObject
      const stream = createReadStream()
      const chunks: Buffer[] = []
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('error', (err) => reject(err))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
      })

      if (buffer.length > 5 * 1000 * 1000) {
        throw new BadRequestError('Icon filesize exceeds the limit. (< 5MB)')
      }

      const fileUrl = await uploadFileToS3(fileKey, buffer, mimetype, true)

      await context.prisma.persona.update({
        where: {
          id: personaId,
        },
        data: {
          iconUrl: fileUrl,
        },
      })
      return {
        filename: fileKey,
      }
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
