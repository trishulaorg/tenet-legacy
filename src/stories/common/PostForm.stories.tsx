import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { PostForm } from '@/src/ui/common/PostForm'

export default {
  title: 'Common/PostForm',
  component: PostForm,
}

const Template: ComponentStory<typeof PostForm> = (args) => <PostForm {...args} />

export const Default = Template.bind({})
