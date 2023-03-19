import type { Privilege } from '@/models/Privilege'
import type { Board } from '@/models/board/Board'
import type { Reply } from '@/models/reply/Reply'
import type { ThreadId } from './ThreadId'
import type { Persona } from '@/models/persona/Persona'
import type { DateString } from '@/models/common/DateString'
import type { ThreadContent } from './ThreadContent'
import type { PostId } from '@/models/post/PostId'
import type { ThreadImageUrl } from './ThreadImageUrl'

export type Thread = {
  __typename?: 'Thread'
  id: ThreadId
  postId: PostId
  content: ThreadContent
  createdAt: DateString
  board: Board
  persona: Persona
  privilege: Privilege
  replies: Reply[]
  imageUrls: ThreadImageUrl[]
}
