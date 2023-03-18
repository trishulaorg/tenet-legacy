import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import IndexPage from '../../pages/index'
import iconImage from '../static/icon.png'
import { aPost } from '../../generated/mocks'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { Privilege } from '@/generated/types'
import type { Activity } from '@/models/activity/Activity'
import type { BoardDescription } from '@/models/board/BoardDescription'
import type { BoardId } from '@/models/board/BoardId'
import type { BoardTitle } from '@/models/board/BoardTitle'
import type { DateString } from '@/models/common/DateString'
import type { PostId } from '@/models/post/PostId'
import type { ReplyContent } from '@/models/reply/ReplyContent'
import type { ReplyId } from '@/models/reply/ReplyId'
import type { ReplyImageUrl } from '@/models/reply/ReplyImageUrl'
import type { ThreadContent } from '@/models/thread/ThreadContent'
import type { ThreadId } from '@/models/thread/ThreadId'
import type { ThreadImageUrl } from '@/models/thread/ThreadImageUrl'
import type { ActivityId } from '@/models/activity/ActivityId'
import type { ActivityTitle } from '@/models/activity/ActivityTitle'
import type { ActivityContent } from '@/models/activity/ActivityContent'

export default {
  title: 'Pages/IndexPage',
  component: IndexPage,
  args: {
    activities: Array(10)
      .fill(null)
      .map((_, i): Activity => {
        const post = aPost({ id: i.toString(), title: `title${i}` })
        return {
          id: post.id as ActivityId,
          title: post.title as ActivityTitle,
          content: post.content as ActivityContent,
          createdAt: post.createdAt as DateString,
          boardId: post.board.id as BoardId,
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
      }),
  },
} satisfies ComponentMeta<typeof IndexPage>

export const SignedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        [
          new PersonaState({
            id: '1' as PersonaId,
            name: 'john_doe' as PersonaName,
            iconUrl: iconImage as unknown as PersonaIconUrl,
            screenName: 'John Doe' as PersonaScreenName,
          }),
        ],
        0
      )
    }
  >
    <IndexPage {...args} />
  </UserStateContext.Provider>
)

export const NotSignedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider value={null}>
    <IndexPage {...args} />
  </UserStateContext.Provider>
)
