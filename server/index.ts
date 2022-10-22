import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NotAuthenticatedError } from './errors/NotAuthenticatedError'
import Pusher from 'pusher'

dotenv.config()

const prisma = new PrismaClient()

export type ContextFunction = typeof context
export type Context = {
  me: User | null
  prisma: PrismaClient
  pusher: Pusher
}

export const context = async ({ req }: ExpressContext): Promise<Context> => {
  const token = req.headers.authorization?.substring('Bearer '.length)
  let me: User | null = null
  if (token && process.env['NEXT_PUBLIC_API_TOKEN_SECRET']) {
    try {
      const decoded = jwt.verify(token, process.env['NEXT_PUBLIC_API_TOKEN_SECRET'])
      if (typeof decoded !== 'object' || typeof decoded['uid'] === 'undefined') {
        throw new NotAuthenticatedError('invalid auth token')
      }
      me = await prisma.user.findFirst({
        where: { token: decoded['uid'] },
        include: { personas: true },
      })
      if (!me) {
        me = await prisma.user.create({
          data: {
            token: decoded['uid'],
          },
        })
      }
    } catch {
      // do nothing. just ignore for now.
    }
  }
  const pusher = new Pusher({
    appId: process.env['PUSHER_APP_ID']!,
    key: process.env['PUSHER_KEY']!,
    secret: process.env['PUSHER_SECRET']!,
    cluster: process.env['PUSHER_CLUSTER']!,
  })
  return {
    me,
    pusher,
    prisma,
  }
}
