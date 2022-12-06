import client from 'graphql-request'
import useSWR from 'swr'
import operations from '../schema/operation.graphql'
import { swrKey } from './swrKey'


const endpoint = 'https://coton.vercel.app/api/graphql'
const key = (name: string, variables: Record<string, unknown>) => (swrKey[name]!)(variables)
const useTenet: (args: {token?: string, operationName:string, variables: Record<string, unknown>}) => ReturnType<typeof useSWR> = ({token, operationName, variables}) => {
  return useSWR(key(operationName, variables), () => client(endpoint, operations[operationName], variables, {
     authorization: 'Bearer '  + token ?? "INVALID_TOKEN"
  }))
}

export { client, swrKey, operations, useTenet }
