import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import iconImage from '@/src/stories/static/icon.png'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import { UserStateProvider } from '@/src/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import type { DateString } from '@/src/domain/models/common/DateString'
import { Thread } from '@/src/ui/thread/Thread'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import { BoardProvider } from '@/src/states/BoardState'
import type { ThreadId } from '@/src/domain/models/thread/ThreadId'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import type { ReplyId } from '@/src/domain/models/reply/ReplyId'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'
import type { Privilege } from '@/src/generated/types'

export default {
  title: 'Thread/Thread',
  component: Thread,
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
  args: {
    parent: {
      id: '1' as PostId,
      title: 'title' as PostTitle,
      content: 'content' as PostContent,
      imageUrls: [],
      createdAt: '2021-01-01T00:00:00.000Z' as DateString,
      board: {
        id: '1' as BoardId,
        title: 'board name' as BoardTitle,
        description: 'board description' as BoardDescription,
      },
      author: {
        id: '1' as PersonaId,
        name: 'john_doe' as PersonaName,
        screenName: 'John Doe' as PersonaScreenName,
        iconUrl: iconImage.src as unknown as PersonaIconUrl,
      },
      privilege: {
        deleteSelf: true,
      },
      threads: [],
      upvote: 10,
      downvote: 5,
    },
    threads: [
      {
        id: '1' as ThreadId,
        postId: '1' as PostId,
        content: 'thread content' as ThreadContent,
        createdAt: '2021-01-01T00:00:00.000Z' as DateString,
        board: {
          id: '1' as BoardId,
          title: 'board name' as BoardTitle,
          description: 'board description' as BoardDescription,
        },
        author: {
          id: '1' as PersonaId,
          name: 'john_doe' as PersonaName,
          screenName: 'John Doe' as PersonaScreenName,
          iconUrl: iconImage.src as unknown as PersonaIconUrl,
        },
        privilege: {
          deleteSelf: true,
        },
        upvote: 100,
        downvote: 10,
        replies: [
          {
            id: '1' as ReplyId,
            threadId: '1' as ThreadId,
            content: 'Nice thread!' as ReplyContent,
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
            imageUrls: [],
          },
        ],
        imageUrls: [],
      },
    ],
  },
} satisfies ComponentMeta<typeof Thread>

export const Default: ComponentStory<typeof Thread> = (args) => <Thread {...args} />
