import { fetcher } from './fetchAPI'

export interface PersonaType {
  id: number
  name: string
  iconUrl: string
}

export interface ActivityType {
  id: number
  boardId: number
  title: string
  content: string
  persona: PersonaType
  threads: any
}

export interface ResultType {
  activities: ActivityType[]
}

export function fetchActivities(token?: string): Promise<ResultType> {
  return fetcher(
    `
    query {
      activities {
        id
        boardId
        title
        content
        persona {
          name
          iconUrl
        }
        threads {
          id
        }
      }
    }
    `,
    {},
    token
  )
}
