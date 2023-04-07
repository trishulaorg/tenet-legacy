import type { Meta, Story } from '@storybook/react'
import { SearchBoxTextField } from '@/src/ui/common/SearchBoxTextField'

export default {
  title: 'common/SearchBoxTextField',
  component: SearchBoxTextField,
} as Meta

const Template: Story<Parameters<typeof SearchBoxTextField>[0]> = (args) => (
  <SearchBoxTextField {...args} />
)

export const Default = Template.bind({})
Default.args = {
  query: '',
  onChange: () => {
    /* noop */
  },
  onFocus: () => {
    /* noop */
  },
}

export const WithQuery = Template.bind({})
WithQuery.args = {
  query: 'example',
  onChange: () => {
    /* noop */
  },
  onFocus: () => {
    /* noop */
  },
}
