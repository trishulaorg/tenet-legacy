import React from 'react'
import type { Story, Meta } from '@storybook/react'
import type { UserIconForHeaderProps } from '@/src/ui/header/UserIconForHeader'
import { UserIconForHeader } from '@/src/ui/header/UserIconForHeader'

export default {
  title: 'UserIconForHeader',
  component: UserIconForHeader,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'md', 'lg'] },
    },
    badgeNumber: {
      control: { type: 'number' },
    },
  },
} as Meta

const Template: Story<UserIconForHeaderProps> = (args) => <UserIconForHeader {...args} />

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  badgeNumber: 2,
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'md',
  badgeNumber: 10,
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  badgeNumber: 99,
}
