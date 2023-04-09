import type { ComponentStory } from '@storybook/react'
import { InputWithLabel } from '@/src/ui/form/InputWithLabel'

export default {
  title: 'Form/InputWithLabel',
  component: InputWithLabel,
}
export const InputWithLabelStory: ComponentStory<typeof InputWithLabel> = () => (
  <InputWithLabel
    label="Rolem ipusum"
    value="value"
    setValue={() => {
      /*noop*/
    }}
  />
)
