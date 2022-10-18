import { resetDatabase } from '../libs/resetDB'
import { generateAPITestClient, prismaClient } from '../libs/client'
import { ulid } from 'ulid'

describe('test third-party api', () => {
  beforeEach(() => {
    resetDatabase()
  })
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
        type: 'bot',
      },
    })
    expect(keyForBot).not.toBeNull()
    const keyForUser = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: ulid(),
        type: 'user',
      },
    })
    expect(keyForUser).not.toBeNull()
  })
  test('getMe should return the owner of token', async () => {
    const user = await prismaClient.user.create({
      data: {
        token: ulid(),
      },
    })
    const key = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: ulid(),
        type: 'bot',
      },
    })
    console.log(key.token)
    const result = await generateAPITestClient({ authorization: `Bearer ${key.token}` }).getMe()
    console.log(result)
    expect(result.me).not.toBeNull()
  })
})
