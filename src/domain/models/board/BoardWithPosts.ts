import type { Post } from '@/src/domain/models/post/Post'
import type { Privilege } from '@/src/domain/models/Privilege'
import type { BoardDescription } from './BoardDescription'
import type { BoardId } from './BoardId'
import type { BoardTitle } from './BoardTitle'

export type BoardWithPosts = {
  __typename?: 'BoardWithPosts'
  id: BoardId
  title: BoardTitle
  description: BoardDescription
  privilege: Privilege
  posts: Post[]
}
