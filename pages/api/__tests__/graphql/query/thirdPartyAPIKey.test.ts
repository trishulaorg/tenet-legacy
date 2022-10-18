import { resetDatabase } from '../libs/resetDB'
import { prismaClient } from '../libs/client'
import { ulid } from 'ulid'

describe('test third-party api', () => {
  beforeEach(() => {
    resetDatabase()
  })
  test('Check third-party tokens can be created', async () => {
    const user = await prismaClient.user.create({
      data: {
        token: '',
      },
    })
    expect(user).not.toBeNull() // ensure user exists
    const keyForBot = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: 'TEST_API_TOKEN_FOR_BOT',
        type: 'bot',
      },
    })
    expect(keyForBot).not.toBeNull()
    const keyForUser = await prismaClient.thirdPartyAPIKey.create({
      data: {
        id: ulid(),
        userId: user.id,
        token: 'TEST_API_TOKEN_FOR_USER',
        type: 'user',
      },
    })
    expect(keyForUser).not.toBeNull()
  })
})
