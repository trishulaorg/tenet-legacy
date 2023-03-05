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
  async getActivities(): Promise<GetActivitiesQuery> {
    return {
      activities: Array(10)
        .fill(null)
        .map((_, i) => aPost({ id: i.toString(), title: `title${i}` })),
    }
  },
  async getBoard(variables: GetBoardQueryVariables): Promise<GetBoardQuery> {
    return {
      board: aBoard({
        id: variables.topicId,
      }),
    }
  },
  async getMe(): Promise<GetMeQuery> {
    return {
      me: {
        personas: Array(5)
          .fill(null)
          .map((_, i) => aPersona({ id: i })),
      },
    }
  },
  async getPost(variables: GetPostQueryVariables): Promise<GetPostQuery> {
    return {
      post: aPost({ ...variables }),
    }
  },
  async Search(variables: SearchQueryVariables): Promise<SearchQuery> {
    return {
      search: Array(10)
        .fill(null)
        .map((_, i) => aSearchResult({ id: i.toString(), title: `${variables.query}${i}` })),
    }
  },
  async getFollowingBoard(): Promise<GetFollowingBoardQuery> {
    return {
      getFollowingBoard: Array(10)
        .fill(null)
        .map((_, i) => ({
          board: aBoard({ id: i.toString() }),
        })),
    }
  },
  async createBoard(): Promise<CreateBoardMutation> {
    return {
      createBoard: {
        id: `${1000}`,
      },
    }
  },
  async createPersona(variables: CreatePersonaMutationVariables): Promise<CreatePersonaMutation> {
    return {
      createPersona: {
        ...variables,
      },
    }
  },
  async createPost(variables: CreatePostMutationVariables): Promise<CreatePostMutation> {
    return {
      createPost: aPost({ ...variables }),
    }
  },
  async createReply(): Promise<CreateReplyMutation> {
    return {
      createReply: {
        id: `${2000}`,
      },
    }
  },
  async createThread(): Promise<CreateThreadMutation> {
    return {
      createThread: {
        id: `${3000}`,
      },
    }
  },
  async putAttachedImage(
    variables: PutAttachedImageMutationVariables
  ): Promise<PutAttachedImageMutation> {
    if (Array.isArray(variables.files)) {
      return {
        putAttachedImage: variables.files.map((v) => ({
          filename: v.name,
        })),
      }
    }
    return {
      putAttachedImage: [{ filename: variables.files.name }],
    }
  },
  async setPersonaIcon(
    variables: SetPersonaIconMutationVariables
  ): Promise<SetPersonaIconMutation> {
    return {
      setPersonaIcon: { filename: variables.file.name },
    }
  },
  async setTypingStateOnBoard(): Promise<SetTypingStateOnBoardMutation> {
    return {
      setTypingStateOnBoard: { id: `${4000}` },
    }
  },
  async deletePost(variables: DeletePostMutationVariables): Promise<DeletePostMutation> {
    return {
      deletePost: {
        id: variables.postId,
      },
    }
  },
  async createFollowingBoard(): Promise<CreateFollowingBoardMutation> {
    return {
      createFollowingBoard: {
        id: `${2300}`,
      },
    }
  },
  async unfollowBoard(variables: UnfollowBoardMutationVariables): Promise<UnfollowBoardMutation> {
    return {
      unfollowBoard: {
        id: variables.boardId,
      },
    }
  },
  async createThirdPartyAPIKey(): Promise<CreateThirdPartyApiKeyMutation> {
    return {
      createThirdPartyAPIKey: {
        token: 'token',
      },
    }
  },
  async createDirectMessage(): Promise<CreateDirectMessageMutation> {
    return {
      createDirectMessage: {
        id: `${12837}`,
      },
    }
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
