import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import { UserStateProvider } from '@/src/states/UserState'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import CreatePostPage from '../../pages/o/cp'
import iconImage from '../static/icon.png'

export default {
  title: 'Pages/CreatePostPage',
  component: CreatePostPage,
} satisfies ComponentMeta<typeof CreatePostPage>

export const Default: ComponentStory<typeof CreatePostPage> = (args) => (
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
    <CreatePostPage {...args} />
  </UserStateProvider>
)
