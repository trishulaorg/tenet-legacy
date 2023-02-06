import client from 'graphql-request'
import useSWR from 'swr'
import operations from '../schema/operation.graphql'
import { swrKey } from './swrKey'

type OperationNameType = keyof typeof swrKey
type OperationFunctionType<T extends OperationNameType> = typeof swrKey[T]

const endpoint = 'https://coton.vercel.app/api/graphql'
const key = <T extends OperationNameType, F extends OperationFunctionType<T>>(
  name: T,
  variables: Parameters<F>[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): string => swrKey[name as T](variables as any)
const fetcher: <Res>(args: {
  token?: string
  operationName: string
  variables: Record<string, unknown>
}) => Promise<Res | Record<string, never>> = async ({ token, variables }) => {
  if (process.env['NEXT_PUBLIC_API_MOCKING'] !== 'enabled') {
    return {}
  }
  return await client(endpoint, operations, variables, {
    authorization: 'Bearer ' + token ?? 'INVALID_TOKEN',
  })
}

const useTenet: <OperationName extends OperationNameType, Data = Record<string, unknown>>(args: {
  token?: string
  operationName: OperationName
  variables: Parameters<OperationFunctionType<OperationName>>[0]
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
