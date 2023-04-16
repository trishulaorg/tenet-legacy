import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { Switch } from '@/src/ui/common/Switch'

export default {
  title: 'Common/Switch',
  component: Switch,
}

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args}>children</Switch>

export const Default = Template.bind({})
Default.args = {
  visibility: true,
}
