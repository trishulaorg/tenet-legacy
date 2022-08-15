import type { Variables } from 'graphql-request'
import { GraphQLClient, request } from 'graphql-request'
import { getSdk } from '../server/frontend-graphql-definition'

export interface APIResult<T> {
  data: T
}

export const ENDPOINT = '/api/graphql'

export const rawFetcher = <T>(args: {
  url: string
  document: string
  token: string | undefined
  variables: Variables
}): Promise<T> =>
  request<T, Variables>(args.url, args.document, args.variables, {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${args.token ?? 'INVALID_TOKEN'}`,
  })

export const fetcher = <T>(document: string, variables: Variables, token?: string): Promise<T> =>
  rawFetcher<T>({ url: ENDPOINT, document, variables, token })

const client = getSdk(new GraphQLClient(ENDPOINT))
const tokenToDefaultHeader = (token?: string): HeadersInit => {
  return {
    authorization: `Bearer ${token}`,
    accept: 'application/json',
  }
}

export { client, tokenToDefaultHeader }
