import type { ComponentStory } from '@storybook/react'
import { SuccessMessage } from '../../ui/form/SuccessMessage'

export default {
  title: 'Form/SuccessMessage',
  component: SuccessMessage,
}
export const SuccessMessageStory: ComponentStory<typeof SuccessMessage> = () => (
  <SuccessMessage successMessage="Rolem ipusum" />
)
