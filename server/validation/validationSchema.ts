import { z } from 'zod'
import { ContentType } from '@prisma/client'
import type { ZodString } from 'zod/lib/types'
import type { NexusGenArgTypes, NexusGenFieldTypes } from '../nexus-typegen'

type ValidationSchemaType = {
  [Method in keyof Pick<NexusGenArgTypes, 'Query' | 'Mutation'>]: {
    [KeyName in keyof NexusGenArgTypes[Method]]: {
      parse: (arg: NexusGenArgTypes[Method][KeyName]) => NexusGenArgTypes[Method][KeyName]
    }
  } & {
    [KeyName in Exclude<keyof NexusGenFieldTypes[Method], keyof NexusGenArgTypes[Method]>]: {
      parse: <T>(arg: T) => T
    }
  }
}

const validationSchema: ValidationSchemaType = {
  Query: {
    me: z.any(),
    persona: z.object({ name: z.string() }),
    personas: z.object({ names: z.array(z.string()) }),
    removeUser: z.any(),
    board: z.object({ id: z.string().min(26).max(26) }),
    post: z.object({ id: z.string().min(26).max(26) }),
    activities: z.any(),
    search: z.object({ query: z.string() }),
  },
  Mutation: {
    createPersona: z.object({
      screenName: z
        .string()
        .min(1, 'Persona screen name is required.')
        .max(30, 'Maximum length of persona screen name is 50.'),
      name: z
        .string()
        .min(1, 'Persona id is required.')
        .max(25, 'Maximum length of persona id is 25.')
        .regex(/^[a-zA-Z0-9]*$/, 'Persona id can only contain alphabet or number.'),
      /**
       * https://github.com/colinhacks/zod/issues/635
       */
      iconPath: z.string().optional() as unknown as ZodString,
    }),
    createBoard: z.object({
      title: z
        .string()
        .min(1, 'Board name is required.')
        .max(30, 'Maximum length of board name is 50.'),
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
      boardId: z.string().min(26).max(26),
      personaId: z.number(),
    }),
    createThread: z.object({
      content: z.string().min(1).max(500),
      contentType: z.nativeEnum(ContentType),
      boardId: z.string().min(26).max(26),
      postId: z.string().min(26).max(26),
      personaId: z.number(),
    }),
    createReply: z.object({
      content: z.string().min(1).max(500),
      contentType: z.nativeEnum(ContentType),
      threadId: z.string().min(26).max(26),
      personaId: z.number(),
    }),
    putAttachedImage: z.any(),
    setPersonaIcon: z.any(),
    setTypingStateOnBoard: z.object({
      personaId: z.number().int(),
      postId: z.string().min(26).max(26),
    }),
  },
} as const

export { validationSchema }
