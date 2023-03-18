import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { Board } from '../../ui/board/Board'
import { BoardState, BoardStateContext, PostState } from '../../states/PostState'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import iconImage from '../static/icon.png'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { BoardId } from '@/models/board/BoardId'
import type { BoardTitle } from '@/models/board/BoardTitle'
import type { BoardDescription } from '@/models/board/BoardDescription'

export default {
  title: 'Board/Board',
  component: Board,
  decorators: [
    (Story) => (
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
        <BoardStateContext.Provider
          value={
            new BoardState({
              id: '1' as BoardId,
              title: 'lorem ipsum' as BoardTitle,
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." as BoardDescription,
              posts: Array(5)
                .fill(null)
                .map(
                  (_, i) =>
                    new PostState({
                      id: String(i + 1),
                      title: 'lorem ipsum',
                      content:
                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                      createdAt: new Date(`${2023 - i}-10-05T14:48:00.000Z`),
                      author: new PersonaState({
                        id: '1' as PersonaId,
                        name: 'john_doe' as PersonaName,
                        iconUrl: iconImage as unknown as PersonaIconUrl,
                        screenName: 'John Doe' as PersonaScreenName,
                      }),
                    })
                ),
            })
          }
        >
          <Story />
        </BoardStateContext.Provider>
      </UserStateContext.Provider>
    ),
  ],
  argTypes: {
    showPostCreate: { control: 'boolean' },
    followButtonType: { control: { type: 'select', options: ['follow', 'unfollow'] } },
    onFollowButtonClick: { action: 'clicked' },
  },
  args: {
    showPostCreate: true,
    followButtonType: 'follow',
  },
} satisfies ComponentMeta<typeof Board>

export const Default: ComponentStory<typeof Board> = (args) => <Board {...args} />
