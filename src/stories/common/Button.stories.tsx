import React from 'react'
import { Button } from '../../ui/common/Button'
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
