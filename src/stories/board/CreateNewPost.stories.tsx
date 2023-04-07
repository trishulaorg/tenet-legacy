import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CreateNewPost } from '@/src/ui/board/CreateNewPost'
import iconImage from '@/src/stories/static/icon.png'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import { UserStateProvider } from '@/src/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'

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
