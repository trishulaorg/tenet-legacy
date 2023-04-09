import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aBoard, aPost } from '@/src/generated/mocks'
import BoardPage from '@/src/pages/board/[board_id]'
import iconImage from '@/src/stories/static/icon.png'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerValue } from '@/src/stories/utils/routerValue'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Privilege } from '@/src/generated/types'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostImageUrl } from '@/src/domain/models/post/PostImageUrl'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'
import type { ReplyId } from '@/src/domain/models/reply/ReplyId'
import type { ReplyImageUrl } from '@/src/domain/models/reply/ReplyImageUrl'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { ThreadImageUrl } from '@/src/domain/models/thread/ThreadImageUrl'
import { UserStateProvider } from '@/src/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'

export default {
  title: 'Pages/BoardPage',
  component: BoardPage,
  args: {
    boardData: (() => {
      const board = aBoard()
      return {
        id: board.id as BoardId,
        title: board.title as BoardTitle,
        description: board.description as BoardDescription,
        privilege: board.privilege as Privilege,
        posts: Array(10)
          .fill(null)
          .map((_, i) => {
            const post = aPost({ id: i.toString(), title: `title${i}` })
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
          }),
      }
    })(),
  },
} satisfies ComponentMeta<typeof BoardPage>

export const SignedIn: ComponentStory<typeof BoardPage> = (args) => (
  <UserStateProvider
    value={
      new UserStateImpl(
        [
          {
            id: '1' as PersonaId,
            name: 'john_doe' as PersonaName,
            iconUrl: iconImage as unknown as PersonaIconUrl,
            screenName: 'John Doe' as PersonaScreenName,
          },
        ],
        0
      )
    }
  >
    <BoardPage {...args} />
  </UserStateProvider>
)

export const SignedInWithBoardId: ComponentStory<typeof BoardPage> = (args) => (
  <RouterContext.Provider
    value={{
      ...routerValue,
      query: {
        board_id: '1',
      },
      isReady: true,
    }}
  >
    <UserStateProvider
      value={
        new UserStateImpl(
          [
            {
              id: '1' as PersonaId,
              name: 'john_doe' as PersonaName,
              iconUrl: iconImage as unknown as PersonaIconUrl,
              screenName: 'John Doe' as PersonaScreenName,
            },
          ],
          0
        )
      }
    >
      <BoardPage {...args} />
    </UserStateProvider>
  </RouterContext.Provider>
)

export const NotSignedIn: ComponentStory<typeof BoardPage> = (args) => (
  <UserStateProvider value={null}>
    <BoardPage {...args} />
  </UserStateProvider>
)
