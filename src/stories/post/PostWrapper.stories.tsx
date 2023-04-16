import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import iconImage from '@/src/stories/static/icon.png'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import { UserStateProvider } from '@/src/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import { BoardProvider } from '@/src/states/BoardState'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { DateString } from '@/src/domain/models/common/DateString'
import { PostWrapper } from '@/src/ui/post/PostWrapper'

export default {
  title: 'Post/PostWrapper',
  component: PostWrapper,
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
        <BoardProvider
          value={{
            id: '1' as BoardId,
            title: 'lorem ipsum' as BoardTitle,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." as BoardDescription,
            privilege: {
              deleteSelf: true,
            },
            posts: Array(5)
              .fill(null)
              .map((_, i) => ({
                id: String(i + 1) as PostId,
                title: 'lorem ipsum' as PostTitle,
                content:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." as PostContent,
                createdAt: `${2023 - i}-10-05T14:48:00.000Z` as DateString,
                imageUrls: [],
                board: {
                  id: '1' as BoardId,
                  title: 'lorem ipsum' as BoardTitle,
                  description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." as BoardDescription,
                },
                privilege: {
                  deleteSelf: true,
                },
                upvote: 0,
                downvote: 0,
                threads: [],
                author: {
                  id: '1' as PersonaId,
                  name: 'john_doe' as PersonaName,
                  iconUrl: iconImage as unknown as PersonaIconUrl,
                  screenName: 'John Doe' as PersonaScreenName,
                },
              })),
          }}
        >
          <Story />
        </BoardProvider>
      </UserStateProvider>
    ),
  ],
} satisfies ComponentMeta<typeof PostWrapper>

export const Default: ComponentStory<typeof PostWrapper> = (args) => <PostWrapper {...args} />
