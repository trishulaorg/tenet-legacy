import { getSdk } from '../../../../../server/frontend-graphql-definition'
import { GraphQLClient } from 'graphql-request'
import { PrismaClient } from '@prisma/client'

const BASE_API_URL = 'http://localhost:3000/api/graphql'

const apiTestClient = getSdk(new GraphQLClient(BASE_API_URL))

const prismaClient = new PrismaClient()

export { apiTestClient, prismaClient }
