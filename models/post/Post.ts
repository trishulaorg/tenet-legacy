import type { DateString } from '@/models/common/DateString'
import type { Board } from '@/models/board/Board'
import type { PostContent } from './PostContent'
import type { PostId } from './PostId'
import type { PostImageUrl } from './PostImageUrl'
import type { PostTitle } from './PostTitle'
import type { Persona } from '@/models/persona/Persona'
import type { Privilege } from '@/models/Privilege'
import type { Thread } from '@/models/thread/Thread'

export type Post = {
  __typename?: 'Post'
  id: PostId
  title: PostTitle
  content: PostContent
  imageUrls: PostImageUrl[]
  createdAt: DateString
  board: Board
  persona: Persona
  privilege: Privilege
  threads: Thread[]
}
