import type { Privilege } from '@/models/Privilege'
import type { ThreadId } from '@/models/thread/ThreadId'
import type { DateString } from '@/models/common/DateString'
import type { ReplyContent } from './ReplyContent'
import type { ReplyId } from './ReplyId'
import type { Persona } from '@/models/persona/Persona'
import type { ReplyImageUrl } from './ReplyImageUrl'

export type Reply = {
  __typename?: 'Reply'
  id: ReplyId
  threadId: ThreadId
  content: ReplyContent
  createdAt: DateString
  persona: Persona
  privilege: Privilege
  imageUrls: ReplyImageUrl[]
}
