import type { ComponentStory } from '@storybook/react'
import { PersonaIconForm } from '../../ui/settings/PersonaIconForm'

export default {
  title: 'Settings/PersonaIconForm',
  component: PersonaIconForm,
}
export const PersonaIconFormStory: ComponentStory<typeof PersonaIconForm> = () => (
  <PersonaIconForm />
)
