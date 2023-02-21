import { createContext, useContext } from 'react'
import client from 'graphql-request'
import type { PostType } from './PostState'
import { getGqlToken } from '../libs/cookies'
import { GetActivitiesDocument } from '../mocks/generated/types'
import { aQuery } from '../mocks/generated/mocks'

type ApiClient = {
  getActivities(): Promise<PostType[]>
}

export class ApiClientImpl implements ApiClient {
  private _endpoint: string

  constructor(options: { endpoint: string }) {
    this._endpoint = options.endpoint
  }

  private get _token(): string {
    return getGqlToken()
  }

  async getActivities(): Promise<PostType[]> {
    if (process.env['NEXT_PUBLIC_API_ENDPOINT'] === 'enabled') {
      return aQuery().activities.map((activity) => ({
        ...activity,
        persona: {
          ...activity.persona,
          id: activity.persona.id.toString(),
        },
        createdAt: new Date(activity.createdAt),
        threads: [],
      }))
    }
    return (
      await client<{ activities: PostType[] }>(
        this._endpoint,
        GetActivitiesDocument,
        {},
        {
          authorization: 'Bearer ' + this._token,
        }
      )
    ).activities
  }
}

export const apiClientImpl = new ApiClientImpl({
  endpoint: process.env['NEXT_PUBLIC_API_ENDPOINT'] ?? '',
})

const ApiClientContext = createContext<ApiClient>({
  getActivities() {
    throw new Error('not implemented!')
  },
})

export const ApiClientProvider = ApiClientContext.Provider

export function useApiClient(): ApiClient {
  return useContext(ApiClientContext)
}
