import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        iconUrl: 'dummy',
        name: 'user' + i,
        token: 'dummy',
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
