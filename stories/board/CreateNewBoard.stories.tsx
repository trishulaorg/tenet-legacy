import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewBoard } from '@/ui/board/CreateNewBoard'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import iconImage from '@/stories/static/icon.png'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'

export default {
  title: 'Board/CreateNewBoard',
  component: CreateNewBoard,
  decorators: [
    (Story) => (
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
        <Story />
      </UserStateContext.Provider>
    ),
  ],
} satisfies ComponentMeta<typeof CreateNewBoard>

export const Default: ComponentStory<typeof CreateNewBoard> = (args) => <CreateNewBoard {...args} />
