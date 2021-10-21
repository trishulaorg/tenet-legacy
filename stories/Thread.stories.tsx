import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Post, PostProps } from '../ui/thread/Post'
import { PostState } from '../states/PostState'
import { PersonaState } from '../states/UserState'

export default {
  title: 'Thread/Thread',
  component: Post,
  decorators: [
    (story) => (
      <div style={{ padding: '3rem', backgroundColor: '#f5f5f5', color: '#333' }}>{story()}</div>
    ),
  ],
} as Meta

const Template: Story<PostProps> = (args) => <Post {...args} />

const post1 = new PostState('Post 1', 'Default Content', new PersonaState('test1'), Date.now())
const post2 = new PostState('Thread 1', 'Thread Content', new PersonaState('test2'), Date.now())
post2.addResponse(new PostState('Reply 1', 'Reply content', new PersonaState('test3'), Date.now()))
post1.addResponse(post2)
post1.addResponse(
  new PostState('Thread 2', 'Thread Content', new PersonaState('test2'), Date.now())
)
post1.addResponse(
  new PostState('Thread 3', 'Thread Content', new PersonaState('test3'), Date.now())
)

export const DefaultThread = Template.bind({})

DefaultThread.args = {
  post: post1,
}
