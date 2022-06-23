import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(): Promise<void> {
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        token: 'token' + i,
      },
    })
    const persona = await prisma.persona.create({
      data: {
        userId: user.id,
        iconUrl: 'http://example.com/img/icon',
        name: 'Persona' + i,
        screenName: 'Display Name of Persona' + i,
      },
    })
    const board = await prisma.board.create({
      data: {
        title: 'Test Board',
        description: 'This is a test board',
      },
    })
    const post = await prisma.post.create({
      data: {
        personaId: persona.id,
        boardId: board.id,
        title: 'Test Post',
        content: 'This is a test post',
        contentType: 'TEXT',
      },
    })
    const thread = await prisma.thread.create({
      data: {
        personaId: persona.id,
        boardId: board.id,
        postId: post.id,
        content: 'Test',
        contentType: 'TEXT',
      },
    })
    await prisma.reply.create({
      data: {
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
