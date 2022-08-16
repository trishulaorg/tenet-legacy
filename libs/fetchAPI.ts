import { GraphQLClient } from 'graphql-request'
import { getSdk, getSdkWithHooks } from '../server/frontend-graphql-definition'

const ENDPOINT = '/api/graphql'

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
