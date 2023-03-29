import { HeaderStateImpl } from '@/infrastructure/states/HeaderStateImpl'
import { UserStateImpl } from '@/infrastructure/states/UserStateImpl'
import type { PersonaIconUrl } from '@/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import { HeaderStateProvider } from '@/states/HeaderState'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { Header } from '../../ui/header/Header'
import iconImage from '../static/icon.png'

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
