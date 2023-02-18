import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewPost } from '../../ui/board/CreateNewPost'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import iconImage from '../static/icon.png'

export default {
  title: 'Board/CreateNewPost',
  component: CreateNewPost,
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
                iconUrl: iconImage as unknown as string,
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
  argTypes: {
    showPostCreate: { control: 'boolean' },
  },
  args: {
    boardId: '1',
    showPostCreate: true,
  },
} satisfies ComponentMeta<typeof CreateNewPost>

export const Default: ComponentStory<typeof CreateNewPost> = (args) => <CreateNewPost {...args} />
