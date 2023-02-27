import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import IndexPage from '../../pages/index'
import iconImage from '../static/icon.png'
import type { PostType } from '../../states/PostState'
import { aPost } from '../../generated/mocks'

export default {
  title: 'Pages/IndexPage',
  component: IndexPage,
  args: {
    activities: Array(10)
      .fill(null)
      .map((_, i): PostType => aPost({ id: i.toString(), title: `title${i}` })),
  },
} satisfies ComponentMeta<typeof IndexPage>

export const LoggedIn: ComponentStory<typeof IndexPage> = (args) => (
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
    <IndexPage {...args} />
  </UserStateContext.Provider>
)

export const NotLoggedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        'INVALID_TOKEN',
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
    <IndexPage {...args} />
  </UserStateContext.Provider>
)
