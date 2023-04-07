import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import { UserStateProvider } from '@/src/states/UserState'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { CommentInput } from '../../ui/thread/CommentInput'
import iconImage from '../static/icon.png'

export default {
  title: 'CommentInput',
  component: CommentInput,
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
    onSubmit: { action: 'onSubmit' },
  },
} satisfies ComponentMeta<typeof CommentInput>

export const Card: ComponentStory<typeof CommentInput> = (args) => <CommentInput {...args} />
