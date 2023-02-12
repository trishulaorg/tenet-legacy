import { InputWithLabel } from '../../ui/form/InputWithLabel'

export default {
  title: 'Form/InputWithLabel',
  component: InputWithLabel,
}
export const InputWithLabelStory = () => (
  <InputWithLabel
    label="Rolem ipusum"
    value="value"
    setValue={() => {
      /*noop*/
    }}
  />
)
