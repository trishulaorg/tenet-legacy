import type { Variables } from 'graphql-request'
import { request } from 'graphql-request'
import type { DocumentNode, FetchResult } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

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

const mutator = <T>(
  query: DocumentNode,
  variables: Variables,
  token: string
): Promise<FetchResult<T>> =>
  new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: '/api/graphql',
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }),
  }).mutate<T>({
    mutation: query,
    variables: variables,
  })

export { mutator }
