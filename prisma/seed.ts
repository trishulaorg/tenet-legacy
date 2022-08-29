import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'
const prisma = new PrismaClient()

async function main(): Promise<void> {
  for (const i of [...Array(100)].map((_, index) => index)) {
    const user = await prisma.user.create({
      data: {
        token: `token${i}`,
      },
    })
    const role = await prisma.allowedWritingRole.create({
      data: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    })
    const persona = await prisma.persona.create({
      data: {
        userId: user.id,
        iconUrl: 'https://picsum.photos/20',
        name: `Persona${i}`,
        screenName: `Display Name of Persona${i}`,
      },
    })
    const board = await prisma.board.create({
      data: {
        id: ulid(),
        title: `Test Board ${i}`,
        description: 'This is a test board',
        defaultBoardRoleId: role.id,
        defaultPostRoleId: role.id,
        defaultThreadRoleId: role.id,
        defaultReplyRoleId: role.id,
      },
    })
    const post = await prisma.post.create({
      data: {
        id: ulid(),
        personaId: persona.id,
        boardId: board.id,
        title: 'Test Post',
        content: 'This is a test post',
        contentType: 'TEXT',
        defaultPostRoleId: role.id,
        defaultThreadRoleId: role.id,
        defaultReplyRoleId: role.id,
      },
    })
    const thread = await prisma.thread.create({
      data: {
        id: ulid(),
        personaId: persona.id,
        boardId: board.id,
        postId: post.id,
        content: 'Test',
        contentType: 'TEXT',
      },
    })
    await prisma.reply.create({
      data: {
        id: ulid(),
        personaId: persona.id,
        threadId: thread.id,
        content: 'Test',
        contentType: 'TEXT',
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
