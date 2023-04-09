import type { DebouncedState } from 'use-debounce'
import { useDebouncedCallback } from 'use-debounce'
import { useApiClient } from '@/src/states/ApiClientState'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PostId } from '@/src/domain/models/post/PostId'
import { useUserState } from '@/src/states/UserState'

export const usePublishWritingStatus = (): DebouncedState<(postId: string) => Promise<unknown>> => {
  const userState = useUserState()
  const apiClient = useApiClient()
  const debounced = useDebouncedCallback((postId: string) => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    return apiClient.setTypingStateOnBoard({
      personaId: userState.currentPersona.id as PersonaId,
      postId: postId as PostId,
    })
  }, 200)
  return debounced
}
