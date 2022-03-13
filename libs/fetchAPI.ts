import { request } from 'graphql-request'

export interface APIResult<T> {
  data: T
}

export type Variables = Record<string, string>

export const ENDPOINT = '/api/graphql'

export function rawFetcher<T>(args: {
  url: string
  document: string
  token?: string
  variables: Variables
}): Promise<T> {
  return request(args.url, args.document, args.variables, {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${args.token ?? 'INVALID_TOKEN'}`,
  })
}

export const fetcher = <T>(
  document: string,
  variables: Record<string, string>,
  token?: string
): Promise<T> => rawFetcher<T>({ url: ENDPOINT, document, variables, token })
