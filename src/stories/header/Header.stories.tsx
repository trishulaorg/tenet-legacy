import { HeaderStateImpl } from '@/src/infrastructure/states/HeaderStateImpl'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import { HeaderStateProvider } from '@/src/states/HeaderState'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { Header } from '@/src/ui/header/Header'
import iconImage from '@/src/stories/static/icon.png'

export default {
  title: 'Header/Header',
  component: Header,
  decorators: [
    (Story) => (
      <HeaderStateProvider
        value={
          new HeaderStateImpl(
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
          )
        }
      >
        <Story />
      </HeaderStateProvider>
    ),
  ],
} satisfies ComponentMeta<typeof Header>

export const Default: ComponentStory<typeof Header> = () => <Header />
