import { useUserState } from '../../states/UserState'
import type { DebouncedState } from 'use-debounce'
import { useDebouncedCallback } from 'use-debounce'
import { useApiClient } from '../../states/ApiClientState'

export const usePublishWritingStatus = (): DebouncedState<(postId: string) => Promise<unknown>> => {
  const userState = useUserState()
  const apiClient = useApiClient()
  const debounced = useDebouncedCallback((postId: string) => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    return apiClient.setTypingStateOnBoard({
      personaId: Number(userState.currentPersona.id),
      postId,
    })
  }, 200)
  return debounced
}
