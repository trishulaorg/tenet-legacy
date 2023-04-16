import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { TypingMemberListLabel } from '@/src/ui/common/TypingMemberListLabel'

export default {
  title: 'Common/TypingMemberListLabel',
  component: TypingMemberListLabel,
}

const Template: ComponentStory<typeof TypingMemberListLabel> = (args) => (
  <TypingMemberListLabel {...args} />
)

export const Single = Template.bind({})
Single.args = {
  members: ['name'],
}

export const Multi = Template.bind({})
Multi.args = {
  members: ['name', 'name2', 'name3'],
}
