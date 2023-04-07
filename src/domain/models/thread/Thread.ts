import type { Privilege } from '@/src/domain/models/Privilege'
import type { Board } from '@/src/domain/models/board/Board'
import type { Reply } from '@/src/domain/models/reply/Reply'
import type { ThreadId } from './ThreadId'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { ThreadContent } from './ThreadContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { ThreadImageUrl } from './ThreadImageUrl'

export type Thread = {
  __typename?: 'Thread'
  id: ThreadId
  postId: PostId
  content: ThreadContent
  createdAt: DateString
  board: Board
  author: Persona
  privilege: Privilege
  upvote: number
  downvote: number
  replies: Reply[]
  imageUrls: ThreadImageUrl[]
}
