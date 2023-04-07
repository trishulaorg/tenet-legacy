import type { ApiClient } from '@/src/application/apiClient'
import { getSdk } from '@/src/generated/types'
import type { Board } from '@/src/domain/models/board/Board'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Post } from '@/src/domain/models/post/Post'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostImageUrl } from '@/src/domain/models/post/PostImageUrl'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { Privilege } from '@/src/domain/models/Privilege'
import type { Reply } from '@/src/domain/models/reply/Reply'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'
import type { ReplyId } from '@/src/domain/models/reply/ReplyId'
import type { ReplyImageUrl } from '@/src/domain/models/reply/ReplyImageUrl'
import type { SearchResult } from '@/src/domain/models/search/SearchResult'
import type { SearchResultId } from '@/src/domain/models/search/SearchResultId'
import type { SearchResultIdKind } from '@/src/domain/models/search/SearchResultIdKind'
import type { SearchResultTitle } from '@/src/domain/models/search/SearchResultTitle'
import type { Thread } from '@/src/domain/models/thread/Thread'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { ThreadImageUrl } from '@/src/domain/models/thread/ThreadImageUrl'
import { GraphQLClient } from 'graphql-request'

export const createApiClientImpl = (sdk: ReturnType<typeof getSdk>): ApiClient => ({
  async getActivities(params) {
    const { activities } = await sdk.getActivities({
      personaId: params?.personaId == null ? null : Number(params.personaId),
    })
    return activities.map((activity) => ({
      id: activity.id as PostId,
      title: activity.title as PostTitle,
      content: activity.content as PostContent,
      imageUrls: [],
      createdAt: activity.createdAt as DateString,
      board: {
        id: activity.board.id as BoardId,
        title: activity.board.title as BoardTitle,
        description: activity.board.description as BoardDescription,
      },
      author: {
        id: String(activity.persona.id) as PersonaId,
        name: activity.persona.name as PersonaName,
        screenName: activity.persona.screenName as PersonaScreenName,
        iconUrl: activity.persona.iconUrl as PersonaIconUrl,
      },
      privilege: activity.privilege as Privilege,
      upvote: 0,
      downvote: 0,
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
        author: {
          id: String(thread.persona.id) as PersonaId,
          name: thread.persona.name as PersonaName,
          screenName: thread.persona.screenName as PersonaScreenName,
          iconUrl: thread.persona.iconUrl as PersonaIconUrl,
        },
        upvote: 0,
        downvote: 0,
        privilege: thread.privilege as Privilege,
        replies: thread.replies.map((reply) => ({
          id: reply.id as ReplyId,
          threadId: reply.threadId as ThreadId,
          content: reply.content as ReplyContent,
          createdAt: reply.createdAt as DateString,
          upvote: 0,
          downvote: 0,
          imageUrls: [],
          author: {
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
        author: {
          id: String(post.persona.id) as PersonaId,
          name: post.persona.name as PersonaName,
          screenName: post.persona.screenName as PersonaScreenName,
          iconUrl: post.persona.iconUrl as PersonaIconUrl,
        },
        privilege: post.privilege as Privilege,
        upvote: 0,
        downvote: 0,
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
          author: {
            id: String(thread.persona.id) as PersonaId,
            name: thread.persona.name as PersonaName,
            screenName: thread.persona.screenName as PersonaScreenName,
            iconUrl: thread.persona.iconUrl as PersonaIconUrl,
          },
          privilege: thread.privilege as Privilege,
          upvote: 0,
          downvote: 0,
          replies: thread.replies.map((reply) => ({
            id: reply.id as ReplyId,
            threadId: reply.threadId as ThreadId,
            content: reply.content as ReplyContent,
            createdAt: reply.createdAt as DateString,
            upvote: 0,
            downvote: 0,
            imageUrls: reply.imageUrls as ReplyImageUrl[],
            author: {
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
      author: {
        id: String(post.persona.id) as PersonaId,
        name: post.persona.name as PersonaName,
        screenName: post.persona.screenName as PersonaScreenName,
        iconUrl: post.persona.iconUrl as PersonaIconUrl,
      },
      privilege: post.privilege as Privilege,
      upvote: 0,
      downvote: 0,
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
        author: {
          id: String(thread.persona.id) as PersonaId,
          name: thread.persona.name as PersonaName,
          screenName: thread.persona.screenName as PersonaScreenName,
          iconUrl: thread.persona.iconUrl as PersonaIconUrl,
        },
        privilege: thread.privilege as Privilege,
        upvote: 0,
        downvote: 0,
        replies: thread.replies.map((reply) => ({
          id: reply.id as ReplyId,
          threadId: reply.threadId as ThreadId,
          content: reply.content as ReplyContent,
          createdAt: reply.createdAt as DateString,
          upvote: 0,
          downvote: 0,
          imageUrls: reply.imageUrls as ReplyImageUrl[],
          author: {
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
