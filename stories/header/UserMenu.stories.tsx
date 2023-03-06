import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import { PersonaState, UserState } from '../../states/UserState'
import { UserMenu } from '../../ui/header/UserMenu'
import iconImage from '../static/icon.png'

export default {
  title: 'Header/UserMenu',
  component: UserMenu,
  decorators: [
    (Story) => (
      <HeaderStateContext.Provider
        value={
          new HeaderState(
            new UserState(
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
} satisfies ComponentMeta<typeof UserMenu>

export const Default: ComponentStory<typeof UserMenu> = (args) => <UserMenu {...args} />
