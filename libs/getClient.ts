import client from 'graphql-request'
import useSWR from 'swr'
import operations from '../schema/operation.graphql'
import { swrKey } from './swrKey'

const endpoint = 'https://coton.vercel.app/api/graphql'
const key = (name: string, variables: Record<string, unknown>) => swrKey[name]!(variables)
const fetcher: (args: {
  token?: string
  operationName: string
  variables: Record<string, unknown>
}) => Promise<unknown> = ({ token, variables }) =>
  client(endpoint, operations, variables, {
    authorization: 'Bearer ' + token ?? 'INVALID_TOKEN',
  })

const useTenet: <Data = Record<string, unknown>>(args: {
  token?: string
  operationName: string
  variables: Record<string, unknown>
  fallbackData?: Record<string, unknown>
}) => ReturnType<typeof useSWR<Data>> = ({ fallbackData, token, operationName, variables }) => {
  const swr = useSWR(
    key(operationName, variables),
    async () =>
      await client(endpoint, operations, variables, {
        authorization: 'Bearer ' + token ?? 'INVALID_TOKEN',
      }),
    { fallbackData }
  )
  return swr
}

export { client, fetcher, swrKey, operations, useTenet }
