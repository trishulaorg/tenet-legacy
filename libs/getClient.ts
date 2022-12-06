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
}) => Promise<any> = ({ token, operationName, variables }) =>
  client(endpoint, operations[operationName], variables, {
    authorization: 'Bearer ' + token ?? 'INVALID_TOKEN',
  })
const useTenet: (args: {
  token?: string
  operationName: string
  variables: Record<string, unknown>
}) => ReturnType<typeof useSWR> = ({ token, operationName, variables }) => {
  const swr = useSWR(
    key(operationName, variables),
    async () =>
      await client(endpoint, operations[operationName], variables, {
        authorization: 'Bearer ' + token ?? 'INVALID_TOKEN',
      })
  )
  return swr
}

export { client, fetcher, swrKey, operations, useTenet }
