import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PostCard } from '../ui/top/PostCard'

export default {
  title: 'TOP/PostCard',
  component: PostCard,
  decorators: [
    (story) => (
      <div style={{ padding: '3rem', backgroundColor: '#f5f5f5', color: '#333' }}>{story()}</div>
    ),
  ],
} as Meta

const Template: Story = () => {
  return <PostCard />
}

export const DefaultPostCard = Template.bind({})
DefaultPostCard.args = {}
