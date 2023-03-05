import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import CreatePostPage from '../../pages/o/cp'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'

export default {
  title: 'Pages/CreatePostPage',
  component: CreatePostPage,
} satisfies ComponentMeta<typeof CreatePostPage>

export const Default: ComponentStory<typeof CreatePostPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
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
    <CreatePostPage {...args} />
  </UserStateContext.Provider>
)
