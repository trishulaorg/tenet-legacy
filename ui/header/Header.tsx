import React, { createContext, useContext } from 'react'
import { observer } from 'mobx-react'
import { Title } from './Title'
import { HeaderState } from '../../states/HeaderState'
import { UserMenu } from './UserMenu'

export type HeaderProps = Record<string, unknown>

export const HeaderStateContext = createContext(new HeaderState())

export const HeaderImpl = observer((props: React.PropsWithChildren<HeaderProps>) => {
  props // wip
  const state = useContext(HeaderStateContext)
  state // wip
  return (
    <nav className="flex item-center justify bg-gray-600 px-4 py-2">
      <Title value="Coton" />
      <UserMenu />
    </nav>
  )
})

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HeaderStateContext.Provider value={new HeaderState()}>
      <HeaderImpl {...props} />
    </HeaderStateContext.Provider>
  )
}
