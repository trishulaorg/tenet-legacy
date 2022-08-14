import { useContext } from 'react'
import { fetcher } from '../../libs/fetchAPI'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { UserStateContext } from '../../states/UserState'
import { useDebouncedCallback } from 'use-debounce'

export const usePublishWritingStatus = (): ((postId: string) => any) => {
  const user = useContext(UserStateContext)
  const debounced = useDebouncedCallback(
    (postId: string) =>
      fetcher(
        queryDocuments.Mutation.setTypingStateOnBoard,
        {
          personaId: user.currentPersona?.id,
          postId,
        },
        user.token
      ),
    200
  )
  return debounced
}
