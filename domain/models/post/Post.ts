import type { DateString } from '@/domain/models/common/DateString'
import type { Board } from '@/domain/models/board/Board'
import type { PostContent } from './PostContent'
import type { PostId } from './PostId'
import type { PostImageUrl } from './PostImageUrl'
import type { PostTitle } from './PostTitle'
import type { Persona } from '@/domain/models/persona/Persona'
import type { Privilege } from '@/domain/models/Privilege'
import type { Thread } from '@/domain/models/thread/Thread'

export type Post = {
  __typename?: 'Post'
  id: PostId
  title: PostTitle
  content: PostContent
  imageUrls: PostImageUrl[]
  createdAt: DateString
  board: Board
  author: Persona
  privilege: Privilege
  threads: Thread[]
  upvote: number
  downvote: number
}
