import { useContext } from 'react'
import { client, setAuthToken } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import type { DebouncedState } from 'use-debounce'
import { useDebouncedCallback } from 'use-debounce'
import type { SetTypingStateOnBoardMutation } from '../../server/autogen/definition'

export const usePublishWritingStatus = (): DebouncedState<
  (postId: string) => Promise<SetTypingStateOnBoardMutation>
> => {
  const user = useContext(UserStateContext)
  setAuthToken(user.token)
  const debounced = useDebouncedCallback(
    (postId: string) =>
      client.setTypingStateOnBoard({
        personaId: user.currentPersona?.id ?? 0,
        postId,
      }),
    200
  )
  return debounced
}
