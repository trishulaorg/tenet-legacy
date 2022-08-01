import type { ResolverType } from '../index'
import { z } from 'zod'
import { ContentType } from '@prisma/client'
import type { ZodString } from 'zod/lib/types'

const validationSchema: {
  Query: {
    [KeyName in keyof ResolverType['Query']]: {
      parse: (
        arg: Parameters<ResolverType['Query'][KeyName]>[1]
      ) => Parameters<ResolverType['Query'][KeyName]>[1]
    }
  }
  Mutation: {
    [KeyName in keyof ResolverType['Mutation']]: {
      parse: (
        arg: Parameters<ResolverType['Mutation'][KeyName]>[1]
      ) => Parameters<ResolverType['Mutation'][KeyName]>[1]
    }
  }
} = {
  Query: {
    me: z.any(),
    persona: z.object({ name: z.string() }),
    personas: z.object({ names: z.array(z.string()) }),
    removeUser: z.any(),
    board: z.object({ id: z.number() }),
    activities: z.any(),
    search: z.object({ query: z.string() }),
  },
  Mutation: {
    createPersona: z.object({
      screenName: z.string().describe('screenName'),
      name: z.string(),
      /**
       * https://github.com/colinhacks/zod/issues/635
       */
      iconPath: z.string().optional() as unknown as ZodString,
    }),
    createBoard: z.object({
      title: z
        .string()
        .min(1, 'Board name is required.')
        .max(50, 'Maximum length of Board name is 50.'),
      description: z
        .string()
        .min(1, 'Description is required.')
        .max(2000, 'Maximum length of description is 2000.'),
      personaId: z.number(),
    }),
    createPost: z.object({
      title: z.string().min(1).max(50),
      content: z.string().min(1).max(2000),
      contentType: z.nativeEnum(ContentType),
      boardId: z.number(),
      personaId: z.number(),
    }),
    createThread: z.object({
      content: z.string().min(1).max(500),
      contentType: z.nativeEnum(ContentType),
      boardId: z.number(),
      postId: z.number(),
      personaId: z.number(),
    }),
    createReply: z.object({
      content: z.string().min(1).max(500),
      contentType: z.nativeEnum(ContentType),
      threadId: z.number(),
      personaId: z.number(),
    }),
  },
} as const

export { validationSchema }
