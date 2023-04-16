import React from 'react'
import { MultiLineText } from '@/src/ui/common/MultiLineText'
import type { ComponentStory } from '@storybook/react'

export default {
  title: 'Common/MultiLineText',
  component: MultiLineText,
}

const Template: ComponentStory<typeof MultiLineText> = (args) => <MultiLineText {...args} />

export const SingleLine = Template.bind({})
SingleLine.args = {
  text: 'Hello',
}

export const MultiLine = Template.bind({})
MultiLine.args = {
  text: 'Hello\nWorld',
}
