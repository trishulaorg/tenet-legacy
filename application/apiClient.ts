import type { Activity } from '@/models/activity/Activity'
import type { Board } from '@/models/board/Board'
import type { BoardDescription } from '@/models/board/BoardDescription'
import type { BoardId } from '@/models/board/BoardId'
import type { BoardTitle } from '@/models/board/BoardTitle'
import type { BoardWithPosts } from '@/models/board/BoardWithPosts'
import type { TopicId } from '@/models/board/TopicId'
import type { Persona } from '@/models/persona/Persona'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { Post } from '@/models/post/Post'
import type { PostContent } from '@/models/post/PostContent'
import type { PostId } from '@/models/post/PostId'
import type { PostTitle } from '@/models/post/PostTitle'
import type { Reply } from '@/models/reply/Reply'
import type { ReplyContent } from '@/models/reply/ReplyContent'
import type { SearchQuery } from '@/models/search/SearchQuery'
import type { SearchResult } from '@/models/search/SearchResult'
import type { Thread } from '@/models/thread/Thread'
import type { ThreadContent } from '@/models/thread/ThreadContent'
import type { ThreadId } from '@/models/thread/ThreadId'
import type { User } from '@/models/user/User'

export type GetActivitiesParams = {
  personaId?: PersonaId
}

export type GetBoardParams = {
  topicId: TopicId
  personaId?: PersonaId
}

export type GetPostParams = {
  id: PostId
  personaId?: PersonaId
}

export type SearchParams = {
  query: SearchQuery
}

export type GetFollowingBoardParams = {
  personaId: PersonaId
}

export type CreateBoardParams = {
  title: BoardTitle
  description: BoardDescription
  personaId: PersonaId
}

export type CreatePersonaParams = {
  screenName: PersonaScreenName
  name: PersonaName
  iconPath: PersonaIconUrl
}

export type CreatePostParams = {
  title: PostTitle
  content: PostContent
  personaId: PersonaId
  boardId: BoardId
}

export type CreateReplyParams = {
  content: ReplyContent
  personaId: PersonaId
  threadId: ThreadId
}

export type CreateThreadParams = {
  content: ThreadContent
  postId: PostId
  personaId: PersonaId
  boardId: BoardId
}

export type PutAttachedImageParams = {
  postId: PostId
  files: File[]
}

export type SetPersonaIconParams = {
  personaId: PersonaId
  file: File
}

export type SetTypingStateOnBoardParams = {
  personaId: PersonaId
  postId: PostId
}

export type DeletePostParams = {
  personaId: PersonaId
  postId: PostId
}

export type FollowBoardParams = {
  personaId: PersonaId
  boardId: BoardId
}

export type UnfollowBoardParams = {
  personaId: PersonaId
  boardId: BoardId
}

export type ApiClient = {
  getActivities(params?: GetActivitiesParams): Promise<Activity[]>
  getBoard(params: GetBoardParams): Promise<BoardWithPosts>
  getMe(): Promise<User>
  getPost(params: GetPostParams): Promise<Post>
  search(params: SearchParams): Promise<SearchResult[]>
  getFollowingBoard(params: GetFollowingBoardParams): Promise<Board[]>
  createBoard(params: CreateBoardParams): Promise<Board>
  createPersona(params: CreatePersonaParams): Promise<Persona>
  createPost(params: CreatePostParams): Promise<Post>
  createReply(params: CreateReplyParams): Promise<Reply>
  createThread(params: CreateThreadParams): Promise<Thread>
  putAttachedImage(params: PutAttachedImageParams): Promise<void>
  setPersonaIcon(params: SetPersonaIconParams): Promise<void>
  setTypingStateOnBoard(params: SetTypingStateOnBoardParams): Promise<void>
  deletePost(params: DeletePostParams): Promise<void>
  followBoard(params: FollowBoardParams): Promise<Board>
  unfollowBoard(params: UnfollowBoardParams): Promise<Board>
}
