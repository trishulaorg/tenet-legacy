import { fetcher } from './fetchAPI'
import { gql } from 'graphql-request'
import type { ThreadType } from '../states/PostState'

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
  threads: ThreadType[]
  createdAt: string
}

export interface ResultType {
  activities: ActivityType[]
}

export function fetchActivities(token?: string): Promise<ResultType> {
  return fetcher(
    gql`
      query {
        activities {
          id
          boardId
          title
          content
          createdAt
          persona {
            screenName
            name
            iconUrl
          }
          threads {
            id
            content
            createdAt
            persona {
              screenName
              name
              iconUrl
            }
            replies {
              id
              content
              createdAt
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
