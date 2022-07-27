import { request, Variables } from 'graphql-request'

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
