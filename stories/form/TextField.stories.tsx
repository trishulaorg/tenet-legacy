import { TextField } from '@/ui/form/TextField'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Form/TextField',
  component: TextField,
  args: {
    type: 'text',
    label: 'name',
    errorMessage: "Name can't be blank",
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'email', 'password'],
      },
    },
  },
} satisfies ComponentMeta<typeof TextField>

export const Default: ComponentStory<typeof TextField> = (args) => <TextField {...args} />
