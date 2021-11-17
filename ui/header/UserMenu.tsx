import React, { MouseEventHandler, useContext } from 'react'
import { observer } from 'mobx-react'
import { HeaderStateContext } from '../../states/HeaderState'
import { MenuIcon } from '@heroicons/react/solid'
import { Switch } from '../common/Switch'
import Link from 'next/link'
export const UserMenu: React.FC = observer(() => {
  const state = useContext(HeaderStateContext)
  return (
    <>
      <div className="flex-initial mx-3 my-auto flex items-center justify-center">
        <div className="my-auto">
          <button onClick={() => state.toggleMenu()}>
            <MenuIcon className="h-5 w-5 text-white" />{' '}
          </button>
          <Switch visibility={state.menuVisibility}>
            <UserMenuItems>
              <Switch visibility={state.isLoggedIn}>
                <UserMenuItem onClick={() => state.togglePersonaList()}>
                  {state.userState?.currentPersona?.name}
                  <Switch visibility={state.personaListVisibility}>
                    <ul className="bg-white width-100">
                      {state.userState?.personas.map((p, idx) => (
                        <li key={idx} className="border-solid border-b-2">
                          <button
                            onClick={() => {
                              state.userState && (state.userState.currentPersonaIndex = idx)
                            }}
                          >
                            {p.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Switch>
                </UserMenuItem>
                <UserMenuItem onClick={() => state.closeMenu()}>
                  <Link href="/api/auth/logout">
                    <a
                      onClick={() => state.logOut()}
                      onKeyDown={() => state.logOut()}
                      role="link"
                      tabIndex={0}
                    >
                      Sign out
                    </a>
                  </Link>
                </UserMenuItem>
              </Switch>
              <Switch visibility={!state.isLoggedIn}>
                <UserMenuItem onClick={() => state.closeMenu()}>
                  <Link href="/api/auth/login">Sign up</Link>
                </UserMenuItem>
              </Switch>
            </UserMenuItems>
          </Switch>
        </div>
      </div>
    </>
  )
})

export const UserMenuItems: React.FC = observer((props) => {
  return (
    <div className="relative inline-block float-right">
      <ul className={`absolute right-0 z-10 bg-white w-48 rounded-sm border-2`}>
        {props.children}
      </ul>
    </div>
  )
})

export const UserMenuItem: React.FC<{ onClick?: MouseEventHandler }> = observer((props) => {
  return (
    <li className="p-4">
      <button onClick={(e) => props.onClick?.(e)}>{props.children}</button>
    </li>
  )
})
