import type { PrismaClient, User, Persona, Post, AllowedWritingRole } from '@prisma/client'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../../errors/NotAuthenticatedError'
import { NotFoundError } from '../../errors/NotFoundError'
import { NotAuthorizedError } from '../../errors/NotAuthorizedError'

const validatePersona = async (
  user: User | null,
  personaId: number,
  prisma: PrismaClient
): Promise<Persona> => {
  if (!user) {
    throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
  }
  const currentPersona = await prisma.persona.findFirst({
    where: {
      user: {
        id: user.id,
      },
      id: personaId,
    },
  })
  if (!currentPersona) {
    throw new NotFoundError('Invalid persona id')
  }
  if (currentPersona.userId !== user.id) {
    throw new NotAuthorizedError('Persona is not owned by current user.')
  }
  return currentPersona
}

const canDeletePost = async (
  persona: Persona,
  post: Post & {
    board: { moderators: Persona[]; defaultPostRole: AllowedWritingRole }
    persona: Persona
    defaultPostRole: AllowedWritingRole
  }
): Promise<boolean> => {
  if (post.board.defaultPostRole.delete === true) {
    return true
  }
  if (post.defaultPostRole.delete === true) {
    return true
  }
  if (post.board.moderators.some((moderatorPersona) => moderatorPersona.id === persona.id)) {
    return true
  }
  return post.persona.id === persona.id
}

export { validatePersona, canDeletePost }
