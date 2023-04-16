import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { UserIcon } from '@/src/ui/common/UserIcon'
import iconImage from '@/src/stories/static/icon.png'
export default {
  title: 'Common/UserIcon',
  component: UserIcon,
}

const Template: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  src: iconImage.src,
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'md',
  src: iconImage.src,
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  src: iconImage.src,
}
