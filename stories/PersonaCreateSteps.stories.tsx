import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PersonaCreateSteps } from '../ui/onboarding/PersonaCreateSteps'
import { PersonaState, PersonaStateContext } from '../states/UserState'

export default {
  title: 'HOME/PersonaCreateSteps',
  component: PersonaCreateSteps,
} as Meta

const Template: Story = () => {
  return (
    <PersonaStateContext.Provider value={new PersonaState({ id: 1, name: 'Test' })}>
      <PersonaCreateSteps />
    </PersonaStateContext.Provider>
  )
}

export const DefaultPersonaCreateSteps = Template.bind({})
DefaultPersonaCreateSteps.args = {}
