import React from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { UserMenu } from './UserMenu'
import { SearchBox } from '@/src/ui/common/SearchBox'

export const Header = observer(() => {
  return (
    <nav className="flex item-center justify bg-contentbg dark:bg-contentbg-dark transition-colors duration-350 px-4 py-4 sticky top-0 z-10 border-solid border-b-1 border-gray-800">
      <Title />
      <SearchBox />
      <UserMenu />
    </nav>
  )
})
