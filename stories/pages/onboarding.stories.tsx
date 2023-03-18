import { ComponentMeta } from '@storybook/react'
import type { ComponentStory } from '@storybook/react'
import OnboardingPage from '../../pages/persona/onboarding'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'

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
    <OnboardingPage {...args} />
  </UserStateContext.Provider>
)

export const EmptyPersonas: ComponentStory<typeof OnboardingPage> = (args) => (
  <UserStateContext.Provider value={new UserState([])}>
    <OnboardingPage {...args} />
  </UserStateContext.Provider>
)
