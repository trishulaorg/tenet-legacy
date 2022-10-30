import type { User, Bot, Persona } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NotAuthenticatedError } from './errors/NotAuthenticatedError'
import Pusher from 'pusher'

dotenv.config()

const prisma = new PrismaClient()

export type UserAccesorType = {
  type: 'user'
  bot: null
  user: User & { personas?: Persona[] }
}

export type BotAccesorType = {
  type: 'bot'
  bot: Bot & { persona?: Persona }
  user: User & { personas?: Persona[] }
}

export type AnnonymousAccessorType = {
  type: 'annonymous'
  bot: null
  user: null
}

export type UniversalAccessorType = UserAccesorType | BotAccesorType | AnnonymousAccessorType

export type ContextFunction = typeof context
export type Context = {
  accessor: UniversalAccessorType
  prisma: PrismaClient
  pusher: Pusher
}

export const context = async ({ req }: ExpressContext): Promise<Context> => {
  const token = req.headers.authorization?.substring('Bearer '.length)
  const pusher = new Pusher({
    appId: process.env['PUSHER_APP_ID']!,
    key: process.env['PUSHER_KEY']!,
    secret: process.env['PUSHER_SECRET']!,
    cluster: process.env['PUSHER_CLUSTER']!,
  })
  if (token) {
    const apiToken = await prisma.thirdPartyAPIKey.findFirst({
      where: {
        token,
      },
      include: {
        bot: {
          include: {
            persona: true,
          },
        },
        user: true,
      },
    })
    if (apiToken) {
      return {
        accessor: {
          type: 'bot',
          bot: apiToken.bot,
          user: apiToken.user,
        } as BotAccesorType,
        pusher,
        prisma,
      }
    }
  }
  if (token && process.env['API_TOKEN_SECRET']) {
    try {
      const decoded = jwt.verify(token, process.env['API_TOKEN_SECRET'])
      if (typeof decoded !== 'object' || typeof decoded.sub === 'undefined') {
        throw new NotAuthenticatedError('invalid auth token')
      }
      let user: (User & { personas?: Persona[] }) | null = await prisma.user.findFirst({
        where: { token: decoded.sub },
        include: { personas: true },
      })
      if (user) {
        return {
          accessor: {
            type: 'user',
            user,
          } as UserAccesorType,
          pusher,
          prisma,
        }
      }
      if (!user) {
        user = await prisma.user.create({
          data: {
            token: decoded.sub,
          },
        })
      }
      return {
        accessor: {
          type: 'user',
          user,
        } as UserAccesorType,
        pusher,
        prisma,
      }
    } catch (e) {
      console.error('Authentication Error', e)
    }
  }
  return {
    accessor: {
      type: 'annonymous',
      bot: null,
      user: null,
    } as AnnonymousAccessorType,
    pusher,
    prisma,
  }
}
