import type { ContentType, PrismaClient, User } from '@prisma/client'
import { validationSchema } from '../validation/validationSchema'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../errors/NotAuthenticatedError'
import { defaultNotFoundErrorMessage, NotFoundError } from '../errors/NotFoundError'
import { ulid } from 'ulid'
import type { Upload } from 'graphql-upload'
import { NotAuthorizedError } from '../errors/NotAuthorizedError'
import { uploadImageFileToS3 } from '../fileUpload/uploadImageFileToS3'
import { ZodSchema } from 'zod'
import Pusher from 'pusher'
import { formatISO } from 'date-fns'

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
    post: async (_source: never, args: { id: string }, context: ContextType) => {
      const post = await context.prisma.post.findFirst({
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

      if (post === null) {
        return post
      }

      const imageParentIds = [post]
        .map((p) => [
          p.id,
          p.threads.map((thread) => thread.id),
          p.threads.map((thread) => thread.replies.map((reply) => reply.id)),
        ])
        .flat()
        .flat()
        .flat()
      const uploadedImages = await context.prisma.uploadedImage.findMany({
        where: {
          parentId: {
            in: imageParentIds,
          },
        },
        orderBy: {
          id: 'desc',
        },
      })

      Object.assign(post, {
        imageUrls: uploadedImages
          .filter((uploadedImage) => uploadedImage.parentId === post.id)
          .map((uploadedImage) => uploadedImage.fileUrl),
      })
      post.threads.forEach((thread) => {
        Object.assign(thread, {
          imageUrls: uploadedImages
            .filter((uploadedImage) => uploadedImage.parentId === thread.id)
            .map((uploadedImage) => uploadedImage.fileUrl),
        })
        thread.replies.forEach((reply) =>
          Object.assign(reply, {
            imageUrls: uploadedImages
              .filter((uploadedImage) => uploadedImage.parentId === reply.id)
              .map((uploadedImage) => uploadedImage.fileUrl),
          })
        )
      })
      return post
    },
    board: async (_source: never, args: { id: string }, context: ContextType) => {
      const board = await context.prisma.board.findFirst({
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
      if (board === null) {
        return board
      }
      const imageParentIds = board.posts
        .map((post) => [
          post.id,
          post.threads.map((thread) => thread.id),
          post.threads.map((thread) => thread.replies.map((reply) => reply.id)),
        ])
        .flat()
        .flat()
        .flat()
      const uploadedImages = await context.prisma.uploadedImage.findMany({
        where: {
          parentId: {
            in: imageParentIds,
          },
        },
        orderBy: {
          id: 'desc',
        },
      })
      board.posts.forEach((post) => {
        Object.assign(post, {
          imageUrls: uploadedImages
            .filter((uploadedImage) => uploadedImage.parentId === post.id)
            .map((uploadedImage) => uploadedImage.fileUrl),
        })
        post.threads.forEach((thread) => {
          Object.assign(thread, {
            imageUrls: uploadedImages
              .filter((uploadedImage) => uploadedImage.parentId === thread.id)
              .map((uploadedImage) => uploadedImage.fileUrl),
          })
          thread.replies.forEach((reply) =>
            Object.assign(reply, {
              imageUrls: uploadedImages
                .filter((uploadedImage) => uploadedImage.parentId === reply.id)
                .map((uploadedImage) => uploadedImage.fileUrl),
            })
          )
        })
      })
      return board
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
    putAttachedImage: async (
      _source: never,
      {
        files,
        postId,
      }: {
        files: Upload[]
        postId: string
      },
      context: ContextType
    ) => {
      if (typeof context.me?.id === 'undefined' || context.me.id < 1) {
        throw new NotAuthenticatedError('Not Authenticated.')
      }
      const fileUrls = await Promise.all(
        files.map(async (file) => uploadImageFileToS3(file, 'attachedImage'))
      )
      await context.prisma.uploadedImage.createMany({
        data: fileUrls.map((fileUrl) => ({
          id: ulid(),
          parentId: postId,
          fileUrl,
        })),
      })
      return fileUrls.map((fileUrl) => ({ filename: fileUrl }))
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

      if (typeof context.me?.id === 'undefined' || context.me.id < 1) {
        throw new NotAuthenticatedError('Not Authenticated.')
      }
      if (context.me.id !== (await persona.user())?.id) {
        throw new NotAuthorizedError('You do not have permission to edit Persona of the User.')
      }
      const fileUrl = await uploadImageFileToS3(file, 'personaIcon')

      await context.prisma.persona.update({
        where: {
          id: personaId,
        },
        data: {
          iconUrl: fileUrl,
        },
      })
      return {
        filename: fileUrl,
      }
    },
    setTypingStateOnBoard: async (
      _source: never,
      {
        personaId,
        postId,
      }: {
        personaId: number
        postId: string
      },
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
          id: personaId,
        },
      })
      if (!currentPersona) {
        throw new NotFoundError('Invalid persona id')
      }
      const post = await context.prisma.post.findFirst({
        where: {
          id: postId,
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

      if (post === null) {
        return post
      }
      /*
       * Pusher integration
       */

      const pusher = new Pusher({
        appId: process.env['PUSHER_APP_ID']!,
        key: process.env['PUSHER_KEY']!,
        secret: process.env['PUSHER_SECRET']!,
        cluster: process.env['PUSHER_CLUSTER']!,
        useTLS: true,
      })

      pusher.trigger('post', 'typing', {
        postId,
        createdAt: formatISO(new Date()),
        authorPersonaId: personaId,
      })

      console.log('event', {
        postId,
        createdAt: formatISO(new Date()),
        authorPersonaId: personaId,
      })

      return post
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
        const schemas = validationSchema[resolverType]
        if (key in schemas) {
          type Keys = keyof typeof validationSchema[typeof resolverType]
          const schema = validationSchema[resolverType][key as Keys] as unknown
          if (schema instanceof ZodSchema) {
            schema.parse(args)
          } else {
            throw new Error(`Validator for ${resolverType}/${key} is not properly set up.`)
          }
        } else {
          throw new Error(`No validator for ${resolverType}/${key} found.`)
        }
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
}
export type ContextType = {
  me: User | null
  prisma: PrismaClient
}
