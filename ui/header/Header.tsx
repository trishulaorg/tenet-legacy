import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { HeaderStateContext } from '../../states/HeaderState'
import { UserMenu } from './UserMenu'

export const Header = observer(() => {
  const state = useContext(HeaderStateContext)
  state.userState?.request()

  return (
    <nav className="flex item-center justify bg-gray-600 px-4 py-2">
      <Title />
      <UserMenu />
    </nav>
  )
})
