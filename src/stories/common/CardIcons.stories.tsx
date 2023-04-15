import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { CardIcons } from '@/src/ui/common/CardIcons'

export default {
  title: 'Common/CardIcons',
  component: CardIcons,
}

const Template: ComponentStory<typeof CardIcons> = (args) => <CardIcons {...args} />

export const Default = Template.bind({})
Default.args = {
  numberOfComment: 42,
  upvote: 100,
  downvote: 50,
  showCommentIcon: true,
}
