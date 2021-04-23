import React from 'react'
import { Story, Meta } from '@storybook/react'

import { UserMenu, UserMenuProps } from '../ui/header/UserMenu'

export default {
  title: 'Header/UserMenu',
  component: UserMenu,
} as Meta

const Template: Story<UserMenuProps> = (args) => <UserMenu {...args} />

export const DefaultUserMenu = Template.bind({})
DefaultUserMenu.args = {
    menuVisibility: true
}
