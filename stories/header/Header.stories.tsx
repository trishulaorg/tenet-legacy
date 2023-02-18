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
              'token',
              [
                new PersonaState({
                  id: '1',
                  name: 'john_doe',
                  iconUrl: iconImage as unknown as string,
                  screenName: 'John Doe',
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
