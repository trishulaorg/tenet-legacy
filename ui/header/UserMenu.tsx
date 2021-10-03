import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { HeaderStateContext } from './Header'
import { MenuIcon } from '@heroicons/react/solid'

export const UserMenu: React.FC = observer(() => {
  const state = useContext(HeaderStateContext)
  return (
    <>
      <div className="flex-initial mx-3 my-auto flex items-center justify-center">
        <button className="my-auto" onClick={() => state.toggleMenu()}>
          <MenuIcon className="h-5 w-5 text-white" />
          <UserMenuItems loggedIn={state.isLoggedIn} visibility={state.menuVisibility} />
        </button>
      </div>
    </>
  )
})

export interface UserMenuItemsProps {
  loggedIn: boolean
  visibility: boolean
}

export const UserMenuItems: React.FC<UserMenuItemsProps> = observer((props) => {
  const loggedOutMenuItems = (
    <div className="relative inline-block float-right">
      <ul
        className={`${
          props.visibility ? '' : 'hidden'
        } absolute right-0 z-10 bg-white w-48 rounded-sm border-2`}
      >
        <li className="p-4">Sign In</li>
      </ul>
    </div>
  )
  return loggedOutMenuItems
})
