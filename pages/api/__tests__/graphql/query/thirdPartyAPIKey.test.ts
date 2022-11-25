import { generateAPITestClient, prismaClient } from '../libs/client'
import { ulid } from 'ulid'
import { ThirdPartyApiKeyType } from '../../../../../server/generated-files/frontend-graphql-definition'

describe('test third-party api', () => {
  test('Check third-party tokens can be created', async () => {
    const user = await prismaClient.user.create({
      data: {
        token: ulid(),
      },
    })
    expect(user).not.toBeNull() // ensure user exists
    const keyForBot = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: ulid(),
        type: 'BOT',
      },
    })
    expect(keyForBot).not.toBeNull()
    const keyForUser = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: ulid(),
        type: 'USER',
      },
    })
    expect(keyForUser).not.toBeNull()
  })
  test('getMe should return the owner of token', async () => {
    const user = await prismaClient.user.create({
      data: {
        id: ulid(),
        token: ulid(),
      },
    })
    const key = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: ulid(),
        type: 'BOT',
      },
    })
    const result = await generateAPITestClient({ authorization: `Bearer ${key.token}` }).getMe()
    expect(result.me).not.toBeNull()
  })
  test('API should be accessable from third-party keys', async () => {
    const user = await prismaClient.user.create({
      data: {
        token: ulid(),
      },
    })
    const persona = await prismaClient.persona.create({
      data: {
        id: ulid()
        name: ulid().substring(10),
        screenName: ulid(),
        iconUrl: '',
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    const key = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        user: {
          connect: {
            id: user.id,
          },
        },
        type: 'BOT',
        token: ulid(),
      },
    })

    const result = await generateAPITestClient({
      authorization: `Bearer ${key.token}`,
    }).createBoard({ personaId: persona.id, title: ulid(), description: ulid() })
    expect(result.createBoard).not.toBeNull
  })
  test('Bot cannot create another bot recursively', async () => {
    const user = await prismaClient.user.create({
      data: {
        id: ulid(),
        token: ulid(),
      },
    })
    const key = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        user: {
          connect: {
            id: user.id,
          },
        },
        type: 'BOT',
        token: ulid(),
      },
    })

    const fn = async () => {
      const client = generateAPITestClient({
        authorization: `Bearer ${key.token}`,
      })
      try {
        await client.createThirdPartyAPIKey({ type: ThirdPartyApiKeyType.Bot })
      } catch {
        throw new Error()
      }
    }
    expect(fn).rejects.toThrow()
  })
})
