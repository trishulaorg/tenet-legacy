import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PostCard } from '../ui/top/PostCard'
import { PostState, PostStateContext } from '../states/PostState'
import { PersonaState } from '../states/UserState'

export default {
  title: 'TOP/PostCard',
  component: PostCard,
  decorators: [
    (story) => (
      <div style={{ padding: '3rem', backgroundColor: '#f5f5f5', color: '#333' }}>{story()}</div>
    ),
  ],
} as Meta

const post = new PostState(
  'Post Title',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ...',
  new PersonaState('test1')
)

const Template: Story = (args) => {
  return (
    <PostStateContext.Provider value={post}>
      <PostCard {...args} />
    </PostStateContext.Provider>
  )
}

export const DefaultPostCard = Template.bind({})
DefaultPostCard.args = {}
