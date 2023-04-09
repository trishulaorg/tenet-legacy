import { createContext, useContext } from 'react'
import type { ApiClient } from '@/application/apiClient'
import type { Board } from '@/domain/models/board/Board'
import type { BoardWithPosts } from '@/domain/models/board/BoardWithPosts'
import type { Persona } from '@/domain/models/persona/Persona'
import type { Post } from '@/domain/models/post/Post'
import type { Reply } from '@/domain/models/reply/Reply'
import type { SearchResult } from '@/domain/models/search/SearchResult'
import type { Thread } from '@/domain/models/thread/Thread'
import type { User } from '@/domain/models/user/User'

export const defaultApiClient: ApiClient = {
  signIn: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  getActivities: function (): Promise<Post[]> {
    throw new Error('Function not implemented.')
  },
  getBoard: function (): Promise<BoardWithPosts> {
    throw new Error('Function not implemented.')
  },
  getMe: function (): Promise<User> {
    throw new Error('Function not implemented.')
  },
  getPost: function (): Promise<Post> {
    throw new Error('Function not implemented.')
  },
  search: function (): Promise<SearchResult[]> {
    throw new Error('Function not implemented.')
  },
  getFollowingBoard: function (): Promise<Board[]> {
    throw new Error('Function not implemented.')
  },
  createBoard: function (): Promise<Board> {
    throw new Error('Function not implemented.')
  },
  createPersona: function (): Promise<Persona> {
    throw new Error('Function not implemented.')
  },
  createPost: function (): Promise<Post> {
    throw new Error('Function not implemented.')
  },
  createReply: function (): Promise<Reply> {
    throw new Error('Function not implemented.')
  },
  createThread: function (): Promise<Thread> {
    throw new Error('Function not implemented.')
  },
  putAttachedImage: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  setPersonaIcon: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  setTypingStateOnBoard: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  deletePost: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  followBoard: function (): Promise<Board> {
    throw new Error('Function not implemented.')
  },
  unfollowBoard: function (): Promise<Board> {
    throw new Error('Function not implemented.')
  },
}

const ApiClientContext = createContext<ApiClient>(defaultApiClient)

export const ApiClientProvider = ApiClientContext.Provider

export function useApiClient(): ApiClient {
  return useContext(ApiClientContext)
}
