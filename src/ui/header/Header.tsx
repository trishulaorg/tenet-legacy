import React from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { UserMenu } from './UserMenu'
import classNames from 'classnames'
import { SearchBox } from '@/src/ui/common/SearchBox'

export const Header: React.FC<{
  className?: string
}> = observer((props) => {
  const { className } = props
  return (
    <nav
      className={classNames(
        className,
        'flex item-center justify bg-contentbg dark:bg-contentbg-dark transition-colors duration-350 px-4 py-4 sticky top-0 z-10 border-solid border-b-1 border-gray-800'
      )}
    >
      <Title className="flex-1 pr-2" />
      <SearchBox className="shrink" />
      <UserMenu />
    </nav>
  )
})
