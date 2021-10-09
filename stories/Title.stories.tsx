import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Title } from '../ui/header/Title'

export default {
  title: 'Header/Title',
  component: Title,
} as Meta

const Template: Story = () => <Title />

export const DefaultTitle = Template.bind({})
DefaultTitle.args = {}
