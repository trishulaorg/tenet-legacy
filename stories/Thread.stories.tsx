import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Post, PostProps } from '../ui/thread/Thread'
import { PostState } from '../states/PostState'

export default {
  title: 'Thread/Thread',
  component: Post,
} as Meta

const Template: Story<PostProps> = (args) => <Post {...args} />

export const DefaultThread = Template.bind({})
const post1 = new PostState('Post 1', 'Default Content', { id: '0', name: 'test1' })
const post2 = new PostState('Thread 1', 'Thread Content', { id: '2', name: 'test2' })
post2.addResponse(new PostState('Reply 1', 'Reply content', { id: '3', name: 'test3' }))
post1.addResponse(post2)
post1.addResponse(new PostState('Thread 2', 'Thread Content', { id: '2', name: 'test2' }))
post1.addResponse(new PostState('Thread 3', 'Thread Content', { id: '2', name: 'test2' }))

DefaultThread.args = {
  post: post1,
}
