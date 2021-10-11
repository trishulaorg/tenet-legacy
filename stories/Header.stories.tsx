import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import { PersonaState, UserState } from '../states/UserState'

export default {
  title: 'Header/Header',
  component: Header,
} as Meta

const Template: Story = (args) => {
  return (
    <HeaderStateContext.Provider
      value={
        new HeaderState(
          new UserState(
            'dummy',
            [
              new PersonaState('Persona 1'),
              new PersonaState('Persona 2'),
              new PersonaState('Persona 3'),
            ],
            0
          )
        )
      }
    >
      <Header {...args} />
    </HeaderStateContext.Provider>
  )
}
export const DefaultHeader = Template.bind({})
DefaultHeader.args = {}
