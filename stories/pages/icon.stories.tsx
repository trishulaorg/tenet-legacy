import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import SetPersonaIconPage from '../../pages/persona/settings/icon'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'

export default {
  title: 'Pages/SetPersonaIconPage',
  component: SetPersonaIconPage,
} satisfies ComponentMeta<typeof SetPersonaIconPage>

export const SignedIn: ComponentStory<typeof SetPersonaIconPage> = (args) => (
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
    <SetPersonaIconPage {...args} />
  </UserStateContext.Provider>
)
