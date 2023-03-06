import { ComponentMeta } from '@storybook/react'
import type { ComponentStory } from '@storybook/react'
import OnboardingPage from '../../pages/persona/onboarding'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'

export default {
  title: 'Pages/OnboardingPage',
  component: OnboardingPage,
} satisfies ComponentMeta<typeof OnboardingPage>

export const Default: ComponentStory<typeof OnboardingPage> = (args) => (
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
    <OnboardingPage {...args} />
  </UserStateContext.Provider>
)

export const EmptyPersonas: ComponentStory<typeof OnboardingPage> = (args) => (
  <UserStateContext.Provider value={new UserState([])}>
    <OnboardingPage {...args} />
  </UserStateContext.Provider>
)
