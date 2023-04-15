import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { AuthorAndBoardLink } from '@/src/ui/common/AuthorAndBoardLink'
import iconImage from '@/src/stories/static/icon.png'

export default {
  title: 'Common/AuthorAndBoardLink',
  component: AuthorAndBoardLink,
}

const Template: ComponentStory<typeof AuthorAndBoardLink> = (args) => (
  <AuthorAndBoardLink {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'name',
  screenName: 'screenName',
  iconUrl: iconImage.src,
}
