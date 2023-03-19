import type { DateString } from '@/models/common/DateString'
import type { ActivityId } from './ActivityId'
import type { BoardId } from '@/models/board/BoardId'
import type { ActivityTitle } from './ActivityTitle'
import type { ActivityContent } from './ActivityContent'
import type { Thread } from '@/models/thread/Thread'
import type { Privilege } from '@/models/Privilege'
import type { Persona } from '@/models/persona/Persona'
import type { Board } from '@/models/board/Board'

export type Activity = {
  __typename?: 'Activity'
  id: ActivityId
  boardId: BoardId
  title: ActivityTitle
  content: ActivityContent
  createdAt: DateString
  board: Board
  persona: Persona
  privilege: Privilege
  threads: Thread[]
}
