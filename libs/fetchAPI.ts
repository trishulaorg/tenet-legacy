import type { Variables } from 'graphql-request'
import { GraphQLClient, request } from 'graphql-request'
import { getSdk, getSdkWithHooks } from '../server/frontend-graphql-definition'

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

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const graphqlClient = new GraphQLClient(ENDPOINT, { headers: defaultHeaders })

const client = getSdk(graphqlClient)
const apiHooks = getSdkWithHooks(graphqlClient)

const setAuthToken = (token: string | undefined): void => {
  if (!token) {
    graphqlClient.setHeaders(defaultHeaders)
  } else {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`)
  }
}

const tokenToDefaultHeader = (token?: string): HeadersInit => {
  return {
    authorization: `Bearer ${token}`,
    accept: 'application/json',
  }
}

export { client, apiHooks, setAuthToken, tokenToDefaultHeader }
