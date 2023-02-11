import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewBoard } from '../../ui/board/CreateNewBoard'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'

import iconImage from '../static/icon.png'

export default {
  title: 'CreateNewBoard',
  component: CreateNewBoard,
  decorators: [
    (Story) => (
      <UserStateContext.Provider
        value={
          new UserState(
            'token',
            [
              new PersonaState({
                id: '1',
                name: 'john_doe',
                iconUrl: iconImage.src,
                screenName: 'John Doe',
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
} satisfies ComponentMeta<typeof CreateNewBoard>

export const Default: ComponentStory<typeof CreateNewBoard> = (args) => <CreateNewBoard {...args} />
