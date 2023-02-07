import type { ReactElement } from 'react'
import React from 'react'
import { UserMenu } from '../../ui/header/UserMenu'

export default {
  title: 'UserMenu',
  component: UserMenu,
}

export const Menu = (): ReactElement => <UserMenu />
