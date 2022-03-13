import React from 'react'
import { Story, Meta } from '@storybook/react'

import { UserMenu } from '../ui/header/UserMenu'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import { PersonaState, UserState } from '../states/UserState'

export default {
  title: 'Header/UserMenu',
  component: UserMenu,
} as Meta

type StoryArgs = {
  loggedIn: boolean
}

const Template: Story<StoryArgs> = (args) => {
  const staticState = new HeaderState()
  staticState.menuVisibility = true
  if (args.loggedIn) {
    const userState = new UserState(
      'dummy',
      [
        new PersonaState({ id: -1, name: 'Persona 1' }),
        new PersonaState({ id: -1, name: 'Persona 2' }),
        new PersonaState({ id: -1, name: 'Persona 3' }),
      ],
      0
    )
    staticState.logIn(userState)
  }
  return (
    <HeaderStateContext.Provider value={staticState}>
      <UserMenu />
    </HeaderStateContext.Provider>
  )
}
export const DefaultUserMenu = Template.bind({})
DefaultUserMenu.args = {
  loggedIn: false,
}

export const SignedInUserMenu = Template.bind({})
SignedInUserMenu.args = {
  loggedIn: true,
}
