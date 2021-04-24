import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Header, HeaderProps } from '../ui/header/Header'

export default {
  title: 'Header/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const DefaultHeader = Template.bind({})
DefaultHeader.args = {}
