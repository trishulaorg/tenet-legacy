import type { PostFormState } from '@/src/application/states/PostFormState'
import { PostFormStateImpl } from '@/src/infrastructure/states/PostFormStateImpl'
import { createContext, useContext } from 'react'

const PostFormStateContext = createContext<PostFormState>(new PostFormStateImpl())

export const PostFormStateProvider = PostFormStateContext.Provider

export function usePostFormState(): PostFormState {
  return useContext(PostFormStateContext)
}
