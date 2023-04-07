import type { ApiClient } from '@/src/application/apiClient'
import { aPost, aBoard, aPersona, aSearchResult } from '@/src/generated/mocks'
import type {
  CreateBoardMutation,
  CreateDirectMessageMutation,
  CreateFollowingBoardMutation,
  CreatePersonaMutation,
  CreatePersonaMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  CreateReplyMutation,
  CreateThirdPartyApiKeyMutation,
  CreateThreadMutation,
  DeletePostMutation,
  DeletePostMutationVariables,
  GetActivitiesQuery,
  GetBoardQuery,
  GetBoardQueryVariables,
  GetFollowingBoardQuery,
  GetMeQuery,
  GetPostQuery,
  GetPostQueryVariables,
  PutAttachedImageMutation,
  PutAttachedImageMutationVariables,
  SearchQuery,
  SearchQueryVariables,
  SetPersonaIconMutation,
  SetPersonaIconMutationVariables,
  SetTypingStateOnBoardMutation,
  UnfollowBoardMutation,
  UnfollowBoardMutationVariables,
} from '@/src/generated/types'
import { createApiClientImpl } from './apiClientImpl'

export const apiClientMockImpl: ApiClient = createApiClientImpl({
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
        posts: Array(10)
          .fill(null)
          .map((_, i) => {
            return aPost({ id: i.toString(), title: `title${i}` })
          }),
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
})
