import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import iconImage from '@/src/stories/static/icon.png'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import { UserStateProvider } from '@/src/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import { Reply } from '@/src/ui/thread/Reply'
import type { ReplyId } from '@/src/domain/models/reply/ReplyId'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { Privilege } from '@/src/domain/models/Privilege'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { ReplyImageUrl } from '@/src/domain/models/reply/ReplyImageUrl'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'

export default {
  title: 'Thread/Reply',
  component: Reply,
  decorators: [
    (Story) => (
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
        <Story />
      </UserStateProvider>
    ),
  ],
  args: {
    replies: [
      {
        id: '1' as ReplyId,
        threadId: '1' as ThreadId,
        content: 'Hi!' as ReplyContent,
        createdAt: '2021-01-01T00:00:00.000Z' as DateString,
        author: {
          id: '1' as PersonaId,
          name: 'john_doe' as PersonaName,
          screenName: 'John Doe' as PersonaScreenName,
          iconUrl: iconImage.src as unknown as PersonaIconUrl,
        },
        privilege: {
          deleteSelf: true,
        } as Privilege,
        upvote: 10,
        downvote: 5,
        imageUrls: [] as ReplyImageUrl[],
      },
      {
        id: '2' as ReplyId,
        threadId: '1' as ThreadId,
        content: 'Hi! Nice to see you!' as ReplyContent,
        createdAt: '2021-01-02T00:00:00.000Z' as DateString,
        author: {
          id: '2' as PersonaId,
          name: 'someone' as PersonaName,
          screenName: 'some one' as PersonaScreenName,
          iconUrl: iconImage.src as unknown as PersonaIconUrl,
        },
        privilege: {
          deleteSelf: true,
        } as Privilege,
        upvote: 0,
        downvote: 0,
        imageUrls: [] as ReplyImageUrl[],
      },
    ],
  },
} satisfies ComponentMeta<typeof Reply>

export const Default: ComponentStory<typeof Reply> = (args) => <Reply {...args} />
