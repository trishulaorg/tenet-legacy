import { fetchAPI, APIResult } from './fetchAPI'

export interface PersonaType {
  name: string
  iconUrl: string
}

export interface ActivityType {
  title: string
  content: string
  persona: PersonaType
}

export interface ResultType {
  activities: ActivityType[]
}

export function fetchActivities(token?: string): Promise<APIResult<ResultType>> {
  return fetchAPI(
    `
    query {
      activities {
        title
        content
        persona {
          name
          iconUrl
        }
      }
    }
    `,
    token
  )
}
