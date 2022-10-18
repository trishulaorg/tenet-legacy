import { generateAPITestClient, prismaClient } from '../libs/client'
import { resetDatabase } from '../libs/resetDB'
import type { Board, Post, Persona } from '@prisma/client'
import { ulid } from 'ulid'
import { randomUniqueId } from '../libs/randomUniqueId'
import type { User } from '@prisma/client'
import { randomAlphabetString } from '../libs/randomAlphabetString'
import type { AllowedWritingRole } from '@prisma/client'

const apiTestClient = generateAPITestClient({})

describe('test activity query api', () => {
  beforeEach(() => {
    resetDatabase()
  })

  test('activities return value', async () => {
    const { activities } = await apiTestClient.getActivities()

    expect(activities).toEqual([])
  })

  test('activities returns posts', async () => {
    const user1: User = {
      id: randomUniqueId(),
      createdAt: new Date(),
      token: ulid(),
    }
    const user2: User = {
      id: randomUniqueId(),
      createdAt: new Date(),
      token: ulid(),
    }
    const users = [user1, user2]

    await prismaClient.user.createMany({
      data: users,
    })

    const persona1: Persona = {
      id: randomUniqueId(),
      createdAt: new Date(),
      name: randomAlphabetString(10),
      screenName: randomAlphabetString(10),
      iconUrl: randomAlphabetString(10),
      userId: user1.id,
    }

    const persona2: Persona = {
      id: randomUniqueId(),
      createdAt: new Date(),
      name: randomAlphabetString(10),
      screenName: randomAlphabetString(10),
      iconUrl: randomAlphabetString(10),
      userId: user2.id,
    }

    const personas = [persona1, persona2]

    await prismaClient.persona.createMany({
      data: personas,
    })

    const role: AllowedWritingRole = await prismaClient.allowedWritingRole.create({
      data: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    })

    const board1: Board = {
      id: ulid(),
      title: randomAlphabetString(10),
      createdAt: new Date(),
      description: randomAlphabetString(10),
      defaultBoardRoleId: role.id,
      defaultPostRoleId: role.id,
      defaultThreadRoleId: role.id,
      defaultReplyRoleId: role.id,
      deletedAt: null,
    }
    const board2: Board = {
      id: ulid(),
      title: randomAlphabetString(10),
      createdAt: new Date(),
      description: randomAlphabetString(10),
      defaultBoardRoleId: role.id,
      defaultPostRoleId: role.id,
      defaultThreadRoleId: role.id,
      defaultReplyRoleId: role.id,
      deletedAt: null,
    }

    const boards: Board[] = [board1, board2]

    await prismaClient.board.createMany({
      data: boards,
    })

    const post1: Post = {
      id: ulid(),
      boardId: board1.id,
      createdAt: new Date('2022-01-02'),
      title: randomAlphabetString(10),
      contentType: 'TEXT',
      content: randomAlphabetString(10),
      personaId: persona1.id,
      defaultPostRoleId: role.id,
      defaultThreadRoleId: role.id,
      defaultReplyRoleId: role.id,
      deletedAt: null,
    }

    const post2: Post = {
      id: ulid(),
      boardId: board2.id,
      createdAt: new Date('2022-01-01'),
      title: randomAlphabetString(10),
      contentType: 'TEXT',
      content: randomAlphabetString(10),
      personaId: persona2.id,
      defaultPostRoleId: role.id,
      defaultThreadRoleId: role.id,
      defaultReplyRoleId: role.id,
      deletedAt: null,
    }

    const posts: Post[] = [post1, post2]

    await prismaClient.post.createMany({
      data: posts,
    })

    const { activities } = await apiTestClient.getActivities()

    expect(activities).toHaveLength(posts.length)
    expect(new Date(activities[0]?.createdAt).valueOf()).toBeGreaterThan(
      new Date(activities[1]?.createdAt).valueOf()
    )
    expect([...activities].sort((a, b) => a.createdAt - b.createdAt)).toEqual(activities)
  })
})
