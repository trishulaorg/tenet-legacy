import type { ZodNumber } from 'zod'
import { z } from 'zod'
import type { ZodString } from 'zod/lib/types'
import type { getSdk } from '../autogen/definition'

export type EndpointsType = ReturnType<typeof getSdk>

type ValidationSchemaType = {
  [EndpointName in keyof EndpointsType]: {
    parse: (
      arg: Parameters<EndpointsType[EndpointName]>[0]
    ) => Parameters<EndpointsType[EndpointName]>[0]
  }
}

const validationSchema: ValidationSchemaType = {
  getMe: z.any(),
  getBoard: z.object({
    topicId: z.string().min(26).max(26),
    /**
     * https://github.com/colinhacks/zod/issues/635
     */
    personaId: z.number().int().min(1).optional() as unknown as ZodNumber,
  }),
  getPost: z.object({
    id: z.string().min(26).max(26),
    /**
     * https://github.com/colinhacks/zod/issues/635
     */
    personaId: z.number().int().min(1).optional() as unknown as ZodNumber,
  }),
  getActivities: z.any(),
  Search: z.object({ query: z.string() }),
  getFollowingBoard: z.object({
    personaId: z.number().int().min(1),
  }),
  createPersona: z.object({
    screenName: z
      .string()
      .min(1, 'Persona screen name is required.')
      .max(30, 'Maximum length of persona screen name is 30.'),
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
      .max(30, 'Maximum length of board name is 30.'),
    description: z
      .string()
      .min(1, 'Description is required.')
      .max(2000, 'Maximum length of description is 2000.'),
    personaId: z.number().int().min(1),
  }),
  createPost: z.object({
    title: z.string().min(1).max(50),
    content: z.string().min(1).max(2000),
    boardId: z.string().min(26).max(26),
    personaId: z.number().int().min(1),
  }),
  createThread: z.object({
    content: z.string().min(1).max(500),
    boardId: z.string().min(26).max(26),
    postId: z.string().min(26).max(26),
    personaId: z.number().int().min(1),
  }),
  createReply: z.object({
    content: z.string().min(1).max(500),
    threadId: z.string().min(26).max(26),
    personaId: z.number().int().min(1),
  }),
  putAttachedImage: z.any(),
  setPersonaIcon: z.any(),
  setTypingStateOnBoard: z.object({
    personaId: z.number().int().int().min(1),
    postId: z.string().min(26).max(26),
  }),
  deletePost: z.object({
    personaId: z.number().int().int().min(1),
    postId: z.string().min(26).max(26),
  }),
  createFollowingBoard: z.object({
    personaId: z.number().int().int().min(1),
    boardId: z.string().min(26).max(26),
  }),
  unfollowBoard: z.object({
    personaId: z.number().int().int().min(1),
    boardId: z.string().min(26).max(26),
  }),
  createThirdPartyAPIKey: z.any(), // wip
  createDirectMessage: z.any(), // wip
} as const

export { validationSchema }
