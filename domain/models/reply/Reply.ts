import type { Privilege } from '@/domain/models/Privilege'
import type { ThreadId } from '@/domain/models/thread/ThreadId'
import type { DateString } from '@/domain/models/common/DateString'
import type { ReplyContent } from './ReplyContent'
import type { ReplyId } from './ReplyId'
import type { Persona } from '@/domain/models/persona/Persona'
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
