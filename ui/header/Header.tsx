import React from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { UserMenu } from './UserMenu'
import { SearchBox } from '../common/SearchBox'

export const Header = observer(() => {
  return (
    <nav className="flex item-center justify bg-contentbg dark:bg-contentbg-dark transition-colors duration-350 px-4 py-2 shadow-md sticky top-0 z-10">
      <Title />
      <SearchBox />
      <UserMenu />
    </nav>
  )
})
