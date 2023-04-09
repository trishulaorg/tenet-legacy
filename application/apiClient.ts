import type { Board } from '@/domain/models/board/Board'
import type { BoardDescription } from '@/domain/models/board/BoardDescription'
import type { BoardId } from '@/domain/models/board/BoardId'
import type { BoardTitle } from '@/domain/models/board/BoardTitle'
import type { BoardWithPosts } from '@/domain/models/board/BoardWithPosts'
import type { TopicId } from '@/domain/models/board/TopicId'
import type { EmailAddress } from '@/domain/models/common/EmailAddress'
import type { Password } from '@/domain/models/common/Password'
import type { Persona } from '@/domain/models/persona/Persona'
import type { PersonaIconUrl } from '@/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import type { Post } from '@/domain/models/post/Post'
import type { PostContent } from '@/domain/models/post/PostContent'
import type { PostId } from '@/domain/models/post/PostId'
import type { PostTitle } from '@/domain/models/post/PostTitle'
import type { Reply } from '@/domain/models/reply/Reply'
import type { ReplyContent } from '@/domain/models/reply/ReplyContent'
import type { SearchQuery } from '@/domain/models/search/SearchQuery'
import type { SearchResult } from '@/domain/models/search/SearchResult'
import type { Thread } from '@/domain/models/thread/Thread'
import type { ThreadContent } from '@/domain/models/thread/ThreadContent'
import type { ThreadId } from '@/domain/models/thread/ThreadId'
import type { User } from '@/domain/models/user/User'

export type SignInParams = {
  emailAddress: EmailAddress
  password: Password
}

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
  signIn(params: SignInParams): Promise<void>
  getActivities(params?: GetActivitiesParams): Promise<Post[]>
  getBoard(params: GetBoardParams): Promise<BoardWithPosts>
  getMe(): Promise<User>
  getPost(params: GetPostParams): Promise<Post>
  search(params: SearchParams): Promise<SearchResult[]>
  getFollowingBoard(params: GetFollowingBoardParams): Promise<Board[]>
  createBoard(params: CreateBoardParams): Promise<Pick<Board, 'id'>>
  createPersona(params: CreatePersonaParams): Promise<Pick<Persona, 'name' | 'screenName'>>
  createPost(params: CreatePostParams): Promise<Pick<Post, 'id'>>
  createReply(params: CreateReplyParams): Promise<Pick<Reply, 'id'>>
  createThread(params: CreateThreadParams): Promise<Pick<Thread, 'id'>>
  putAttachedImage(params: PutAttachedImageParams): Promise<void>
  setPersonaIcon(params: SetPersonaIconParams): Promise<void>
  setTypingStateOnBoard(params: SetTypingStateOnBoardParams): Promise<void>
  deletePost(params: DeletePostParams): Promise<void>
  followBoard(params: FollowBoardParams): Promise<Pick<Board, 'id'>>
  unfollowBoard(params: UnfollowBoardParams): Promise<Pick<Board, 'id'>>
}
