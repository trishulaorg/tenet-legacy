import { createContext, useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { getGqlToken } from '../libs/cookies'
import { getSdk } from '../generated/types'
import type {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetActivitiesQuery,
  GetActivitiesQueryVariables,
  GetBoardQuery,
  GetBoardQueryVariables,
  GetMeQuery,
  GetMeQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
  SearchQuery,
  SearchQueryVariables,
  GetFollowingBoardQuery,
  GetFollowingBoardQueryVariables,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  CreatePersonaMutation,
  CreatePersonaMutationVariables,
  CreateReplyMutation,
  CreateReplyMutationVariables,
  CreateThreadMutation,
  CreateThreadMutationVariables,
  PutAttachedImageMutation,
  PutAttachedImageMutationVariables,
  SetPersonaIconMutation,
  SetPersonaIconMutationVariables,
  SetTypingStateOnBoardMutation,
  SetTypingStateOnBoardMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
  CreateFollowingBoardMutation,
  CreateFollowingBoardMutationVariables,
  UnfollowBoardMutation,
  UnfollowBoardMutationVariables,
  CreateThirdPartyApiKeyMutation,
  CreateThirdPartyApiKeyMutationVariables,
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables,
} from '../generated/types'
import { aPost } from '../generated/mocks'
import { aBoard, aPersona, aSearchResult } from '../generated/mocks'

type ApiClient = {
  getActivities(variables?: GetActivitiesQueryVariables): Promise<GetActivitiesQuery>
  getBoard(variables: GetBoardQueryVariables): Promise<GetBoardQuery>
  getMe(variables?: GetMeQueryVariables): Promise<GetMeQuery>
  getPost(variables: GetPostQueryVariables): Promise<GetPostQuery>
  Search(variables: SearchQueryVariables): Promise<SearchQuery>
  getFollowingBoard(variables: GetFollowingBoardQueryVariables): Promise<GetFollowingBoardQuery>
  createBoard(variables: CreateBoardMutationVariables): Promise<CreateBoardMutation>
  createPersona(variables: CreatePersonaMutationVariables): Promise<CreatePersonaMutation>
  createPost(variables: CreatePostMutationVariables): Promise<CreatePostMutation>
  createReply(variables: CreateReplyMutationVariables): Promise<CreateReplyMutation>
  createThread(variables: CreateThreadMutationVariables): Promise<CreateThreadMutation>
  putAttachedImage(variables: {
    postId: string
    files: File | File[]
  }): Promise<PutAttachedImageMutation>
  setPersonaIcon(variables: SetPersonaIconMutationVariables): Promise<SetPersonaIconMutation>
  setTypingStateOnBoard(
    variables: SetTypingStateOnBoardMutationVariables
  ): Promise<SetTypingStateOnBoardMutation>
  deletePost(variables: DeletePostMutationVariables): Promise<DeletePostMutation>
  createFollowingBoard(
    variables: CreateFollowingBoardMutationVariables
  ): Promise<CreateFollowingBoardMutation>
  unfollowBoard(variables: UnfollowBoardMutationVariables): Promise<UnfollowBoardMutation>
  createThirdPartyAPIKey(
    variables: CreateThirdPartyApiKeyMutationVariables
  ): Promise<CreateThirdPartyApiKeyMutation>
  createDirectMessage(
    variables: CreateDirectMessageMutationVariables
  ): Promise<CreateDirectMessageMutation>
}

export const apiClientImpl: ApiClient = getSdk(
  new GraphQLClient(process.env['NEXT_PUBLIC_API_ENDPOINT'] ?? ''),
  (action, _operationName, _operationType) => {
    return action({ authorization: 'Bearer ' + getGqlToken() })
  }
)

export const apiClientImplMock: ApiClient = {
  getActivities(): Promise<GetActivitiesQuery> {
    return Promise.resolve({
      activities: Array(10)
        .fill(null)
        .map((_, i) => aPost({ id: i.toString(), title: `title${i}` })),
    })
  },
  getBoard(variables: GetBoardQueryVariables): Promise<GetBoardQuery> {
    return Promise.resolve({
      board: aBoard({
        id: variables.topicId,
      }),
    })
  },
  getMe(): Promise<GetMeQuery> {
    return Promise.resolve({
      me: {
        personas: Array(5)
          .fill(null)
          .map((_, i) => aPersona({ id: i })),
      },
    })
  },
  getPost(variables: GetPostQueryVariables): Promise<GetPostQuery> {
    return Promise.resolve({
      post: aPost({ ...variables }),
    })
  },
  Search(variables: SearchQueryVariables): Promise<SearchQuery> {
    return Promise.resolve({
      search: Array(10)
        .fill(null)
        .map((_, i) => aSearchResult({ id: i.toString(), title: `${variables.query}${i}` })),
    })
  },
  getFollowingBoard(): Promise<GetFollowingBoardQuery> {
    return Promise.resolve({
      getFollowingBoard: Array(10)
        .fill(null)
        .map((_, i) => ({
          board: aBoard({ id: i.toString() }),
        })),
    })
  },
  createBoard(): Promise<CreateBoardMutation> {
    return Promise.resolve({
      createBoard: {
        id: `${1000}`,
      },
    })
  },
  createPersona(variables: CreatePersonaMutationVariables): Promise<CreatePersonaMutation> {
    return Promise.resolve({
      createPersona: {
        ...variables,
      },
    })
  },
  createPost(variables: CreatePostMutationVariables): Promise<CreatePostMutation> {
    return Promise.resolve({
      createPost: aPost({ ...variables }),
    })
  },
  createReply(): Promise<CreateReplyMutation> {
    return Promise.resolve({
      createReply: {
        id: `${2000}`,
      },
    })
  },
  createThread(): Promise<CreateThreadMutation> {
    return Promise.resolve({
      createThread: {
        id: `${3000}`,
      },
    })
  },
  putAttachedImage(
    variables: PutAttachedImageMutationVariables
  ): Promise<PutAttachedImageMutation> {
    if (Array.isArray(variables.files)) {
      return Promise.resolve({
        putAttachedImage: variables.files.map((v) => ({
          filename: v.name,
        })),
      })
    }
    return Promise.resolve({
      putAttachedImage: [{ filename: variables.files.name }],
    })
  },
  setPersonaIcon(variables: SetPersonaIconMutationVariables): Promise<SetPersonaIconMutation> {
    return Promise.resolve({
      setPersonaIcon: { filename: variables.file.name },
    })
  },
  setTypingStateOnBoard(): Promise<SetTypingStateOnBoardMutation> {
    return Promise.resolve({
      setTypingStateOnBoard: { id: `${4000}` },
    })
  },
  deletePost(variables: DeletePostMutationVariables): Promise<DeletePostMutation> {
    return Promise.resolve({
      deletePost: {
        id: variables.postId,
      },
    })
  },
  createFollowingBoard(): Promise<CreateFollowingBoardMutation> {
    return Promise.resolve({
      createFollowingBoard: {
        id: `${2300}`,
      },
    })
  },
  unfollowBoard(variables: UnfollowBoardMutationVariables): Promise<UnfollowBoardMutation> {
    return Promise.resolve({
      unfollowBoard: {
        id: variables.boardId,
      },
    })
  },
  createThirdPartyAPIKey(): Promise<CreateThirdPartyApiKeyMutation> {
    return Promise.resolve({
      createThirdPartyAPIKey: {
        token: 'token',
      },
    })
  },
  createDirectMessage(): Promise<CreateDirectMessageMutation> {
    return Promise.resolve({
      createDirectMessage: {
        id: `${12837}`,
      },
    })
  },
}

const ApiClientContext = createContext<ApiClient>({
  getActivities() {
    throw new Error('Function not implemented.')
  },
  createPost: function () {
    throw new Error('Function not implemented.')
  },
  getBoard: function (): Promise<GetBoardQuery> {
    throw new Error('Function not implemented.')
  },
  getMe: function (): Promise<GetMeQuery> {
    throw new Error('Function not implemented.')
  },
  getPost: function (): Promise<GetPostQuery> {
    throw new Error('Function not implemented.')
  },
  Search: function (): Promise<SearchQuery> {
    throw new Error('Function not implemented.')
  },
  getFollowingBoard: function (): Promise<GetFollowingBoardQuery> {
    throw new Error('Function not implemented.')
  },
  createBoard: function (): Promise<CreateBoardMutation> {
    throw new Error('Function not implemented.')
  },
  createPersona: function (): Promise<CreatePersonaMutation> {
    throw new Error('Function not implemented.')
  },
  createReply: function (): Promise<CreateReplyMutation> {
    throw new Error('Function not implemented.')
  },
  createThread: function (): Promise<CreateThreadMutation> {
    throw new Error('Function not implemented.')
  },
  putAttachedImage: function (): Promise<PutAttachedImageMutation> {
    throw new Error('Function not implemented.')
  },
  setPersonaIcon: function (): Promise<SetPersonaIconMutation> {
    throw new Error('Function not implemented.')
  },
  setTypingStateOnBoard: function (): Promise<SetTypingStateOnBoardMutation> {
    throw new Error('Function not implemented.')
  },
  deletePost: function (): Promise<DeletePostMutation> {
    throw new Error('Function not implemented.')
  },
  createFollowingBoard: function (): Promise<CreateFollowingBoardMutation> {
    throw new Error('Function not implemented.')
  },
  unfollowBoard: function (): Promise<UnfollowBoardMutation> {
    throw new Error('Function not implemented.')
  },
  createThirdPartyAPIKey: function (): Promise<CreateThirdPartyApiKeyMutation> {
    throw new Error('Function not implemented.')
  },
  createDirectMessage: function (): Promise<CreateDirectMessageMutation> {
    throw new Error('Function not implemented.')
  },
})

export const ApiClientProvider = ApiClientContext.Provider

export function useApiClient(): ApiClient {
  return useContext(ApiClientContext)
}
