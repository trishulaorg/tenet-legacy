import { exec } from 'child_process'

const resetDatabase = (): void => {
  if (process.env['NODE_ENV'] !== 'test') {
    throw new Error('resetting database is only allowed in test environment.')
  }

  // fixme
  const isLocalServer =
    process.env['DATABASE_URL']?.includes('@localhost') ||
    process.env['DATABASE_URL']?.includes('@127.0.0.1')
  if (!isLocalServer) {
    throw new Error('resetting database is only allowed in local database.')
  }

  exec('npx prisma migrate reset --force')
  console.log('database reset!')
}

export { resetDatabase }
