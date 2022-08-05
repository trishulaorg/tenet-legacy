import { fetcher } from './fetchAPI'
import type { BoardType, ThreadType } from '../states/PostState'
import { queryDocuments } from '../server/graphql-schema/queryDocuments'

export interface PersonaType {
  id: number
  name: string
  screenName: string
  iconUrl: string
}

export interface ActivityType {
  id: string
  board: BoardType
  boardId: string
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
  return fetcher(queryDocuments.Query.activities, {}, token)
}
