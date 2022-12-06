import client from 'graphql-request'
import useSWR from 'swr'
import operations from '../schema/operation.graphql'
import { swrKey } from './swrKey'

export { client, swrKey, operations }
