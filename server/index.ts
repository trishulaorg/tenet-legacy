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
  console.log(token)
  let me: User | null = null
  if (token) {
    const apiToken = await prisma.thirdPartyAPIKey.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    })
    me = apiToken ? apiToken.user : null
  }
  if (token && process.env['API_TOKEN_SECRET']) {
    if (!me) {
      try {
        const decoded = jwt.verify(token, process.env['API_TOKEN_SECRET'])
        if (typeof decoded !== 'object' || typeof decoded.sub === 'undefined') {
          throw new NotAuthenticatedError('invalid auth token')
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
        // nothing to do
      }
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
