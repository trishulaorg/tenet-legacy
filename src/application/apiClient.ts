import type { Board } from '@/src/domain/models/board/Board'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { BoardWithPosts } from '@/src/domain/models/board/BoardWithPosts'
import type { TopicId } from '@/src/domain/models/board/TopicId'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Post } from '@/src/domain/models/post/Post'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { Reply } from '@/src/domain/models/reply/Reply'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'
import type { SearchQuery } from '@/src/domain/models/search/SearchQuery'
import type { SearchResult } from '@/src/domain/models/search/SearchResult'
import type { Thread } from '@/src/domain/models/thread/Thread'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { User } from '@/src/domain/models/user/User'
import type { EmailAddress } from '@/src/domain/models/common/EmailAddress'
import type { Password } from '@/src/domain/models/common/Password'

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
