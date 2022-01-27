import { fetcher } from './fetchAPI'

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

export function fetchActivities(token?: string): Promise<ResultType> {
  return fetcher(
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
    {},
    token
  )
}
