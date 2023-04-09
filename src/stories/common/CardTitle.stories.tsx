//<CardTitle Story

import React from 'react'
import type { Story, Meta } from '@storybook/react/types-6-0'

import type { CardTitleProps } from '@/src/ui/common/CardTitle'
import { CardTitle } from '@/src/ui/common/CardTitle'

export default {
  title: 'Common/CardTitle',
  component: CardTitle,
} as Meta

const Template: Story<CardTitleProps> = (args) => <CardTitle {...args} />

export const CardTitleStory = Template.bind({})
CardTitleStory.args = {
  title: 'Rolem ipusum',
}
