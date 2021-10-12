import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PostCard } from '../ui/top/PostCard'

export default {
  title: 'TOP/PostCard',
  component: PostCard,
} as Meta

const Template: Story = () => {
  return <PostCard />
}

export const DefaultPostCard = Template.bind({})
DefaultPostCard.args = {}
