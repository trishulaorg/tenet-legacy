import { getSdk } from '../../../../../server/autogen/definition'
import { GraphQLClient } from 'graphql-request'
import { PrismaClient } from '@prisma/client'

const BASE_API_URL = 'http://localhost:3000/api/graphql'

const generateAPITestClient = (headers: HeadersInit): ReturnType<typeof getSdk> =>
  getSdk(new GraphQLClient(BASE_API_URL, { headers }))

const prismaClient = new PrismaClient()

export { generateAPITestClient, prismaClient }
