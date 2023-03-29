import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewBoard } from '@/ui/board/CreateNewBoard'
import iconImage from '@/stories/static/icon.png'
import type { PersonaIconUrl } from '@/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import { UserStateProvider } from '@/states/UserState'
import { UserStateImpl } from '@/infrastructure/states/UserStateImpl'

export default {
  title: 'Board/CreateNewBoard',
  component: CreateNewBoard,
  decorators: [
    (Story) => (
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
        <Story />
      </UserStateProvider>
    ),
  ],
} satisfies ComponentMeta<typeof CreateNewBoard>

export const Default: ComponentStory<typeof CreateNewBoard> = (args) => <CreateNewBoard {...args} />
