import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import { UserState, PersonaState } from '../../states/UserState'
import { Header } from '../../ui/header/Header'
import iconImage from '../static/icon.png'

export default {
  title: 'Header/Header',
  component: Header,
  decorators: [
    (Story) => (
      <HeaderStateContext.Provider
        value={
          new HeaderState(
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
          )
        }
      >
        <Story />
      </HeaderStateContext.Provider>
    ),
  ],
} satisfies ComponentMeta<typeof Header>

export const Default: ComponentStory<typeof Header> = () => <Header />
