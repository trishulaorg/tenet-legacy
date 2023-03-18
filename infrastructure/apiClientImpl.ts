import type { ApiClient } from '@/application/apiClient'
import { getSdk } from '@/generated/types'
import type { ActivityContent } from '@/models/activity/ActivityContent'
import type { ActivityId } from '@/models/activity/ActivityId'
import type { ActivityTitle } from '@/models/activity/ActivityTitle'
import type { Board } from '@/models/board/Board'
import type { BoardDescription } from '@/models/board/BoardDescription'
import type { BoardId } from '@/models/board/BoardId'
import type { BoardTitle } from '@/models/board/BoardTitle'
import type { DateString } from '@/models/common/DateString'
import type { Persona } from '@/models/persona/Persona'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { Post } from '@/models/post/Post'
import type { PostContent } from '@/models/post/PostContent'
import type { PostId } from '@/models/post/PostId'
import type { PostImageUrl } from '@/models/post/PostImageUrl'
import type { PostTitle } from '@/models/post/PostTitle'
import type { Privilege } from '@/models/Privilege'
import type { Reply } from '@/models/reply/Reply'
import type { ReplyContent } from '@/models/reply/ReplyContent'
import type { ReplyId } from '@/models/reply/ReplyId'
import type { ReplyImageUrl } from '@/models/reply/ReplyImageUrl'
import type { SearchResult } from '@/models/search/SearchResult'
import type { SearchResultId } from '@/models/search/SearchResultId'
import type { SearchResultIdKind } from '@/models/search/SearchResultIdKind'
import type { SearchResultTitle } from '@/models/search/SearchResultTitle'
import type { Thread } from '@/models/thread/Thread'
import type { ThreadContent } from '@/models/thread/ThreadContent'
import type { ThreadId } from '@/models/thread/ThreadId'
import type { ThreadImageUrl } from '@/models/thread/ThreadImageUrl'
import { GraphQLClient } from 'graphql-request'

export const createApiClientImpl = (sdk: ReturnType<typeof getSdk>): ApiClient => ({
  async getActivities(params) {
    const response = await sdk.getActivities({
      personaId: params?.personaId == null ? null : Number(params.personaId),
    })
    return response.activities.map((activity) => ({
      id: activity.id as ActivityId,
      boardId: activity.boardId as BoardId,
      title: activity.title as ActivityTitle,
      content: activity.content as ActivityContent,
      createdAt: activity.createdAt as DateString,
      board: {
        id: activity.board.id as BoardId,
        title: activity.board.title as BoardTitle,
        description: activity.board.description as BoardDescription,
      },
      persona: {
        id: String(activity.persona.id) as PersonaId,
        name: activity.persona.name as PersonaName,
        screenName: activity.persona.screenName as PersonaScreenName,
        iconUrl: activity.persona.iconUrl as PersonaIconUrl,
      },
      privilege: activity.privilege as Privilege,
      threads: activity.threads.map((thread) => ({
        id: thread.id as ThreadId,
        postId: thread.postId as PostId,
        content: thread.content as ThreadContent,
        imageUrls: [],
        createdAt: thread.createdAt as DateString,
        board: {
          id: thread.board.id as BoardId,
          title: thread.board.title as BoardTitle,
        },
        persona: {
          id: String(thread.persona.id) as PersonaId,
          name: thread.persona.name as PersonaName,
          screenName: thread.persona.screenName as PersonaScreenName,
          iconUrl: thread.persona.iconUrl as PersonaIconUrl,
        },
        privilege: thread.privilege as Privilege,
        replies: thread.replies.map((reply) => ({
          id: reply.id as ReplyId,
          threadId: reply.threadId as ThreadId,
          content: reply.content as ReplyContent,
          createdAt: reply.createdAt as DateString,
          imageUrls: [],
          persona: {
            id: String(reply.persona.id) as PersonaId,
            name: reply.persona.name as PersonaName,
            screenName: reply.persona.screenName as PersonaScreenName,
            iconUrl: reply.persona.iconUrl as PersonaIconUrl,
          },
          privilege: reply.privilege as Privilege,
        })),
      })),
    }))
  },
  async getBoard(params) {
    const response = await sdk.getBoard({
      topicId: params.topicId,
      personaId: Number(params.personaId),
    })
    return {
      id: response.board.id as BoardId,
      title: response.board.title as BoardTitle,
      description: response.board.description as BoardDescription,
      privilege: response.board.privilege as Privilege,
      posts: response.board.posts.map((post) => ({
        id: post.id as PostId,
        title: post.title as PostTitle,
        content: post.content as PostContent,
        imageUrls: post.imageUrls as PostImageUrl[],
        createdAt: post.createdAt as DateString,
        board: {
          id: post.board.id as BoardId,
          title: post.board.title as BoardTitle,
          description: post.board.description as BoardDescription,
        },
        persona: {
          id: String(post.persona.id) as PersonaId,
          name: post.persona.name as PersonaName,
          screenName: post.persona.screenName as PersonaScreenName,
          iconUrl: post.persona.iconUrl as PersonaIconUrl,
        },
        privilege: post.privilege as Privilege,
        threads: post.threads.map((thread) => ({
          id: thread.id as ThreadId,
          postId: thread.postId as PostId,
          content: thread.content as ThreadContent,
          createdAt: thread.createdAt as DateString,
          imageUrls: thread.imageUrls as ThreadImageUrl[],
          board: {
            id: thread.board.id as BoardId,
            title: thread.board.title as BoardTitle,
          },
          persona: {
            id: String(thread.persona.id) as PersonaId,
            name: thread.persona.name as PersonaName,
            screenName: thread.persona.screenName as PersonaScreenName,
            iconUrl: thread.persona.iconUrl as PersonaIconUrl,
          },
          privilege: thread.privilege as Privilege,
          replies: thread.replies.map((reply) => ({
            id: reply.id as ReplyId,
            threadId: reply.threadId as ThreadId,
            content: reply.content as ReplyContent,
            createdAt: reply.createdAt as DateString,
            imageUrls: reply.imageUrls as ReplyImageUrl[],
            persona: {
              id: String(reply.persona.id) as PersonaId,
              name: reply.persona.name as PersonaName,
              screenName: reply.persona.screenName as PersonaScreenName,
              iconUrl: reply.persona.iconUrl as PersonaIconUrl,
            },
            privilege: reply.privilege as Privilege,
          })),
        })),
      })),
    }
  },
  async getMe() {
    const response = await sdk.getMe()
    if (response.me == null) {
      throw new Error('User not found')
    }
    return {
      personas: response.me.personas.map((persona) => ({
        id: String(persona.id) as PersonaId,
        name: persona.name as PersonaName,
        screenName: persona.screenName as PersonaScreenName,
        iconUrl: persona.iconUrl as PersonaIconUrl,
      })),
    }
  },
  async getPost(params): Promise<Post> {
    const { post } = await sdk.getPost({
      id: params.id,
      personaId: Number(params.personaId),
    })
    return {
      id: post.id as PostId,
      title: post.title as PostTitle,
      content: post.content as PostContent,
      imageUrls: post.imageUrls as PostImageUrl[],
      createdAt: post.createdAt as DateString,
      board: {
        id: post.board.id as BoardId,
        title: post.board.title as BoardTitle,
        description: post.board.description as BoardDescription,
      },
      persona: {
        id: String(post.persona.id) as PersonaId,
        name: post.persona.name as PersonaName,
        screenName: post.persona.screenName as PersonaScreenName,
        iconUrl: post.persona.iconUrl as PersonaIconUrl,
      },
      privilege: post.privilege as Privilege,
      threads: post.threads.map((thread) => ({
        id: thread.id as ThreadId,
        postId: thread.postId as PostId,
        content: thread.content as ThreadContent,
        createdAt: thread.createdAt as DateString,
        imageUrls: thread.imageUrls as ThreadImageUrl[],
        board: {
          id: thread.board.id as BoardId,
          title: thread.board.title as BoardTitle,
        },
        persona: {
          id: String(thread.persona.id) as PersonaId,
          name: thread.persona.name as PersonaName,
          screenName: thread.persona.screenName as PersonaScreenName,
          iconUrl: thread.persona.iconUrl as PersonaIconUrl,
        },
        privilege: thread.privilege as Privilege,
        replies: thread.replies.map((reply) => ({
          id: reply.id as ReplyId,
          threadId: reply.threadId as ThreadId,
          content: reply.content as ReplyContent,
          createdAt: reply.createdAt as DateString,
          imageUrls: reply.imageUrls as ReplyImageUrl[],
          persona: {
            id: String(reply.persona.id) as PersonaId,
            name: reply.persona.name as PersonaName,
            screenName: reply.persona.screenName as PersonaScreenName,
            iconUrl: reply.persona.iconUrl as PersonaIconUrl,
          },
          privilege: reply.privilege as Privilege,
        })),
      })),
    }
  },
  async search(params): Promise<SearchResult[]> {
    const response = await sdk.Search(params)
    return response.search.map((result) => ({
      id: result.id as SearchResultId,
      kind: result.kind as SearchResultIdKind,
      title: result.title as SearchResultTitle,
    }))
  },
  async getFollowingBoard(params): Promise<Board[]> {
    const response = await sdk.getFollowingBoard({
      personaId: Number(params.personaId),
    })
    return response.getFollowingBoard.map((v) => ({
      id: v.board.id as BoardId,
      title: v.board.title as BoardTitle,
    }))
  },
  async createBoard(params): Promise<Pick<Board, 'id'>> {
    const response = await sdk.createBoard({
      title: params.title,
      description: params.description,
      personaId: Number(params.personaId),
    })
    return {
      id: response.createBoard.id as BoardId,
    }
  },
  async createPersona(params): Promise<Pick<Persona, 'name' | 'screenName'>> {
    const response = await sdk.createPersona(params)
    return {
      name: response.createPersona.name as PersonaName,
      screenName: response.createPersona.screenName as PersonaScreenName,
    }
  },
  async createPost(params): Promise<Pick<Post, 'id'>> {
    const response = await sdk.createPost({
      title: params.title,
      content: params.content,
      personaId: Number(params.personaId),
      boardId: params.boardId,
    })
    return {
      id: response.createPost.id as PostId,
    }
  },
  async createReply(params): Promise<Pick<Reply, 'id'>> {
    const response = await sdk.createReply({
      content: params.content,
      threadId: params.threadId,
      personaId: Number(params.personaId),
    })
    return {
      id: response.createReply.id as ReplyId,
    }
  },
  async createThread(params): Promise<Pick<Thread, 'id'>> {
    const response = await sdk.createThread({
      content: params.content,
      postId: params.postId,
      boardId: params.boardId,
      personaId: Number(params.personaId),
    })
    return {
      id: response.createThread.id as ThreadId,
    }
  },
  async putAttachedImage(params): Promise<void> {
    await sdk.putAttachedImage(params)
  },
  async setPersonaIcon(params): Promise<void> {
    await sdk.setPersonaIcon({
      personaId: Number(params.personaId),
      file: params.file,
    })
  },
  async setTypingStateOnBoard(params): Promise<void> {
    await sdk.setTypingStateOnBoard({
      personaId: Number(params.personaId),
      postId: params.postId,
    })
  },
  async deletePost(params): Promise<void> {
    await sdk.deletePost({
      personaId: Number(params.personaId),
      postId: params.postId,
    })
  },
  async followBoard(params): Promise<Pick<Board, 'id'>> {
    const {
      createFollowingBoard: { id },
    } = await sdk.createFollowingBoard({
      personaId: Number(params.personaId),
      boardId: params.boardId,
    })
    return { id: id as BoardId }
  },
  async unfollowBoard(params): Promise<Pick<Board, 'id'>> {
    const {
      unfollowBoard: { id },
    } = await sdk.unfollowBoard({
      personaId: Number(params.personaId),
      boardId: params.boardId,
    })
    return { id: id as BoardId }
  },
})

export const apiClient: ApiClient = createApiClientImpl(
  getSdk(new GraphQLClient(process.env['NEXT_PUBLIC_API_ENDPOINT'] ?? ''))
)
