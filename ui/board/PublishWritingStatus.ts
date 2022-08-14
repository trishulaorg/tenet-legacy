import { useContext } from 'react'
import { fetcher } from '../../libs/fetchAPI'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { UserStateContext } from '../../states/UserState'

export const usePublishWritingStatus = (): ((postId: string) => any) => {
  const user = useContext(UserStateContext)
  return (postId: string) =>
    fetcher(
      queryDocuments.Mutation.setTypingStateOnBoard,
      {
        personaId: user.currentPersona?.id,
        postId,
      },
      user.token
    )
}
