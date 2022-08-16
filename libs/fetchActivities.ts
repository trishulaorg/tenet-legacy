import { client, setAuthToken } from './fetchAPI'
import type { GetActivitiesQuery } from '../server/frontend-graphql-definition'

export function fetchActivities(token?: string): Promise<GetActivitiesQuery> {
  setAuthToken(token)
  return client.getActivities({})
}
