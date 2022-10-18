import { getSdk } from '../../../../../server/generated-files/frontend-graphql-definition'
import { GraphQLClient } from 'graphql-request'
import { PrismaClient } from '@prisma/client'

const BASE_API_URL = 'http://localhost:3000/api/graphql'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const generateAPITestClient = (headers: HeadersInit) =>
  getSdk(new GraphQLClient(BASE_API_URL, { headers }))

const prismaClient = new PrismaClient()

export { generateAPITestClient, prismaClient }
