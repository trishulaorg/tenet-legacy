import React from 'react'
import { Button } from '../../ui/common/Button'
import type { ComponentStory } from '@storybook/react'

export default {
  title: 'Button',
  component: Button,
}

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const PrimarySmall = Template.bind({})
PrimarySmall.args = {
  size: 'small',
  label: 'Button',
}

export const PrimaryNormal = Template.bind({})
PrimaryNormal.args = {
  size: 'normal',
  label: 'Button',
}

export const PrimaryBig = Template.bind({})
PrimaryBig.args = {
  size: 'big',
  label: 'Button',
}
