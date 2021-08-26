import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Thread, ThreadProps } from '../ui/thread/Thread'

export default {
  title: 'Thread/Thread',
  component: Thread,
} as Meta

const Template: Story<ThreadProps> = (args) => <Thread {...args} />

export const DefaultThread = Template.bind({})
DefaultThread.args = {
  title: 'Test Thread',
  content: 'Empty Content',
}
