import type { Privilege } from '@/src/domain/models/Privilege'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { ReplyContent } from './ReplyContent'
import type { ReplyId } from './ReplyId'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { ReplyImageUrl } from './ReplyImageUrl'

export type Reply = {
  __typename?: 'Reply'
  id: ReplyId
  threadId: ThreadId
  content: ReplyContent
  createdAt: DateString
  author: Persona
  privilege: Privilege
  upvote: number
  downvote: number
  imageUrls: ReplyImageUrl[]
}
