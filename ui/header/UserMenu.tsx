import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { HeaderStateContext } from '../../states/HeaderState'
import { MenuIcon } from '@heroicons/react/solid'

export const UserMenu: React.FC = observer(() => {
  const state = useContext(HeaderStateContext)
  return (
    <>
      <div className="flex-initial mx-3 my-auto flex items-center justify-center">
        <button className="my-auto" onClick={() => state.toggleMenu()}>
          <MenuIcon className="h-5 w-5 text-white" />
          <UserMenuItems>
            <Switch visibility={state.isLoggedIn}>
              <UserMenuItem onClick={() => state.togglePersonaList()}>
                {state.userState?.currentPersona.name}
                <Switch visibility={state.personaListVisibility}>
                  <ul className="bg-white width-100">
                    {state.userState?.personas.map((p, idx) => (
                      <li key={idx} className="border-solid border-b-2">
                        <button
                          onClick={() =>
                            state.userState && (state.userState.currentPersonaIndex = idx)
                          }
                        >
                          {p.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Switch>
              </UserMenuItem>
              <UserMenuItem onClick={() => undefined}>Sign out</UserMenuItem>
            </Switch>
            <Switch visibility={!state.isLoggedIn}>
              <UserMenuItem onClick={() => undefined}>Sign up</UserMenuItem>
            </Switch>
          </UserMenuItems>
        </button>
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

export const Switch: React.FC<{ visibility: boolean }> = observer((props) => {
  return <>{props.visibility ? props.children : undefined}</>
})

export const UserMenuItem: React.FC<{ onClick: () => void }> = observer((props) => {
  return (
    <li className="p-4">
      <button onClick={() => props.onClick()}>{props.children}</button>
    </li>
  )
})
