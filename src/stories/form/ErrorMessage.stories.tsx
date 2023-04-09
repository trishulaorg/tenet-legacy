import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { ErrorMessage } from '@/src/ui/form/ErrorMessage'

export default {
  title: 'Form/ErrorMessage',
  component: ErrorMessage,
  args: {
    errorMessage: 'Something went wrong.',
  },
} satisfies ComponentMeta<typeof ErrorMessage>

export const Default: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />
