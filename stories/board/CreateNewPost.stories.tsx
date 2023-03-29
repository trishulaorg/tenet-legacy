import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewPost } from '../../ui/board/CreateNewPost'
import iconImage from '../static/icon.png'
import type { PersonaIconUrl } from '@/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import type { BoardId } from '@/domain/models/board/BoardId'
import { UserStateProvider } from '@/states/UserState'
import { UserStateImpl } from '@/infrastructure/states/UserStateImpl'

export default {
  title: 'Board/CreateNewPost',
  component: CreateNewPost,
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
  argTypes: {
    showPostCreate: { control: 'boolean' },
  },
  args: {
    boardId: '1' as BoardId,
    showPostCreate: true,
  },
} satisfies ComponentMeta<typeof CreateNewPost>

export const Default: ComponentStory<typeof CreateNewPost> = (args) => <CreateNewPost {...args} />
