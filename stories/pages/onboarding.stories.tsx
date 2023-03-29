import { ComponentMeta } from '@storybook/react'
import type { ComponentStory } from '@storybook/react'
import OnboardingPage from '../../pages/persona/onboarding'
import iconImage from '../static/icon.png'
import type { PersonaIconUrl } from '@/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import { UserStateProvider } from '@/states/UserState'
import { UserStateImpl } from '@/infrastructure/states/UserStateImpl'

export default {
  title: 'Pages/OnboardingPage',
  component: OnboardingPage,
} satisfies ComponentMeta<typeof OnboardingPage>

export const Default: ComponentStory<typeof OnboardingPage> = (args) => (
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
    <OnboardingPage {...args} />
  </UserStateProvider>
)

export const EmptyPersonas: ComponentStory<typeof OnboardingPage> = (args) => (
  <UserStateProvider value={new UserStateImpl([])}>
    <OnboardingPage {...args} />
  </UserStateProvider>
)
