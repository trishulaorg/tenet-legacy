import { useContext } from 'react'
import { UserStateContext } from '../../states/UserState'
import type { DebouncedState } from 'use-debounce'
import { useDebouncedCallback } from 'use-debounce'
import { fetcher } from '../../libs/getClient'
import { getGqlToken } from '../../libs/cookies'

export const usePublishWritingStatus = (): DebouncedState<(postId: string) => Promise<unknown>> => {
  const user = useContext(UserStateContext)
  const debounced = useDebouncedCallback(
    (postId: string) =>
      fetcher({
        token: getGqlToken() ?? 'INVALID_TOKEN',
        operationName: 'setTypingStateOnBoard',
        variables: {
          personaId: user.currentPersona?.id ?? 0,
          postId,
        },
      }),
    200
  )
  return debounced
}
