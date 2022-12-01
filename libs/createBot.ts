import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'
;(async () => {
  // const danbooruURL = 'http://danbooru.donmai.us/posts.atom'
  const prismaClient = new PrismaClient()
  const key = await prismaClient.thirdPartyAPIKey.create({
    data: {
      id: ulid(),
      type: 'BOT',
      token: ulid(),
      user: {
        create: {
          token: ulid(),
        },
      },
    },
  })
  const persona = await prismaClient.persona.create({
    data: {
      name: 'firstbot',
      screenName: 'firstbot',
      iconUrl: '',
      user: {
        connect: {
          id: key.userId,
        },
      },
    },
  })
  console.debug(key)
  console.debug(persona)
})()
