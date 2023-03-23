import type { BoardDescription } from './BoardDescription'
import type { BoardId } from './BoardId'
import type { BoardTitle } from './BoardTitle'

export type Board = {
  __typename?: 'Board'
  id: BoardId
  title: BoardTitle
  description?: BoardDescription
}
