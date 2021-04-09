import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Title, TitleProps } from '../ui/header/Title'

export default {
  title: 'Header/Title',
  component: Title,
} as Meta

const Template: Story<TitleProps> = (args) => <Title {...args} />

export const DefaultTitle = Template.bind({})
DefaultTitle.args = {
  value: 'Title',
}
