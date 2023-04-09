import React from 'react'
import { Button } from '@/src/ui/common/Button'
import type { ComponentStory } from '@storybook/react'
import { RssIcon } from '@heroicons/react/solid'

export default {
  title: 'Common/Button',
  component: Button,
}

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const PrimarySmall = Template.bind({})
PrimarySmall.args = {
  size: 'small',
  label: 'Button',
}

export const PrimarySmallLoading = Template.bind({})
PrimarySmallLoading.args = {
  size: 'small',
  label: 'Button',
  isLoading: true,
}

export const PrimaryNormal = Template.bind({})
PrimaryNormal.args = {
  size: 'normal',
  label: 'Button',
}

export const PrimaryNormalLoading = Template.bind({})
PrimaryNormalLoading.args = {
  size: 'normal',
  label: 'Button',
  isLoading: true,
}

export const PrimaryBig = Template.bind({})
PrimaryBig.args = {
  size: 'big',
  label: 'Button',
}

export const PrimaryBigLoading = Template.bind({})
PrimaryBigLoading.args = {
  size: 'big',
  label: 'Button',
  isLoading: true,
}

export const PrimarySmallWithIcon = Template.bind({})
PrimarySmallWithIcon.args = {
  size: 'small',
  label: 'Button',
  icon: <RssIcon width={24} />,
}

export const PrimaryNormalWithIcon = Template.bind({})
PrimaryNormalWithIcon.args = {
  size: 'normal',
  label: 'Button',
  icon: <RssIcon width={24} />,
}

export const PrimaryBigWithIcon = Template.bind({})
PrimaryBigWithIcon.args = {
  size: 'big',
  label: 'Button',
  icon: <RssIcon width={24} />,
}
