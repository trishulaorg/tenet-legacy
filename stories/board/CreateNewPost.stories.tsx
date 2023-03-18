import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewPost } from '../../ui/board/CreateNewPost'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import iconImage from '../static/icon.png'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { BoardId } from '@/models/board/BoardId'

export default {
  title: 'Board/CreateNewPost',
  component: CreateNewPost,
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
        <Story />
      </UserStateContext.Provider>
    ),
  ],
  argTypes: {
    showPostCreate: { control: 'boolean' },
  },
  args: {
    boardId: '1' as BoardId,
    showPostCreate: true,
  },
} satisfies ComponentMeta<typeof CreateNewPost>

export const Default: ComponentStory<typeof CreateNewPost> = (args) => <CreateNewPost {...args} />
