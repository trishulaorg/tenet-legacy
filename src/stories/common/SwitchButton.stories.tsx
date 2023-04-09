import React from 'react'
import { action } from '@storybook/addon-actions'

import type { SwitchButtonProps } from '@/src/ui/common/SwitchButton'
import SwitchButton from '@/src/ui/common/SwitchButton'
import type { Meta, Story } from '@storybook/react'

export default {
  title: 'SwitchButton',
  component: SwitchButton,
} as Meta

const Template: Story<SwitchButtonProps> = (args) => <SwitchButton {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Toggle switch',
  initialValue: false,
  onToggle: action('onToggle'),
}
