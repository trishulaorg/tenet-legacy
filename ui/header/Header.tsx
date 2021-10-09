import React, { createContext, useContext } from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { HeaderState } from '../../states/HeaderState'
import { UserMenu } from './UserMenu'
import { UserState } from '../../states/UserState'

export interface HeaderProps {
  user: UserState
}

export const HeaderStateContext = createContext(new HeaderState())

export const HeaderImpl = observer(() => {
  const state = useContext(HeaderStateContext)
  state.userState?.request()

  return (
    <nav className="flex item-center justify bg-gray-600 px-4 py-2">
      <Title />
      <UserMenu />
    </nav>
  )
})

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HeaderStateContext.Provider value={new HeaderState(props.user)}>
      <HeaderImpl />
    </HeaderStateContext.Provider>
  )
}
