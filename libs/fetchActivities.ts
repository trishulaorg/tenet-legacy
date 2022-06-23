import { fetcher } from './fetchAPI'

export interface PersonaType {
  id: number
  name: string
  screenName: string
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
          screenName
          name
          iconUrl
        }
        threads {
          id
          content
          persona {
            screenName
            name
            iconUrl
          }
          replies {
            id
            content
            persona {
              screenName
              name
              iconUrl
            }
          }
        }
      }
    }
    `,
    {},
    token
  )
}
