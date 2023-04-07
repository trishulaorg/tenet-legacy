import type { MouseEventHandler } from 'react'
import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { Switch } from '@/src/ui/common/Switch'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useHeaderState } from '@/src/states/HeaderState'
import { UserIconForHeader } from './UserIconForHeader'

export const UserMenu: React.FC = observer(() => {
  const headerState = useHeaderState()
  const { theme, setTheme, systemTheme } = useTheme()

  if (headerState == null) {
    return null
  }

  return (
    <>
      <div className="flex-initial mx-3 h-full my-auto flex items-center justify-center text-high dark:text-high-dark">
        <div className="my-auto">
          <button onClick={() => headerState.toggleMenu()}>
            <UserIconForHeader size="md" />
          </button>
          <Switch visibility={headerState.menuVisibility}>
            <UserMenuItems>
              <Switch visibility={headerState.isLoggedIn}>
                <UserMenuItem onClick={() => headerState.togglePersonaList()}>
                  {headerState.userState?.currentPersona?.name}
                  <Switch visibility={headerState.personaListVisibility}>
                    <Switch visibility={headerState.userState != null}>
                      <ul className="bg-contentbg dark:bg-contentbg-dark width-100">
                        {headerState.userState?.personas?.map((p, idx) => (
                          <li key={idx} className="border-solid border-b-2">
                            <button
                              onClick={() => {
                                headerState.setCurrentPersonaIndex(idx)
                              }}
                            >
                              {p.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Switch>
                  </Switch>
                </UserMenuItem>
                <UserMenuItem onClick={() => headerState.closeMenu()}>
                  <Link
                    href="/auth"
                    onClick={() => headerState.logOut()}
                    onKeyDown={() => headerState.logOut()}
                    role="link"
                    tabIndex={0}
                  >
                    Sign out
                  </Link>
                </UserMenuItem>
              </Switch>
              <Switch visibility={headerState.isLoggedIn}>
                <UserMenuItem onClick={() => headerState.closeMenu()}>
                  <Link href="/settings">Settings</Link>
                </UserMenuItem>
              </Switch>
              <Switch visibility={headerState.isLoggedIn}>
                <UserMenuItem onClick={() => headerState.closeMenu()}>
                  <Link href="/persona/settings/icon">Change Persona Icon</Link>
                </UserMenuItem>
              </Switch>
              <Switch visibility={!headerState.isLoggedIn}>
                <UserMenuItem onClick={() => headerState.closeMenu()}>
                  <Link href="/auth">Sign in / Sign up</Link>
                </UserMenuItem>
              </Switch>
              <UserMenuItem
                onClick={() => {
                  setTheme(
                    theme == 'system'
                      ? systemTheme == 'dark'
                        ? 'light'
                        : 'dark'
                      : theme == 'dark'
                      ? 'light'
                      : 'dark'
                  )
                  // window.localStorage.setItem('theme', theme)
                  // console.log(theme, window.localStorage.getItem('theme'))
                }}
              >
                Switch Theme
              </UserMenuItem>
            </UserMenuItems>
          </Switch>
        </div>
      </div>
    </>
  )
})

export const UserMenuItems: React.FC = observer((props) => {
  const headerState = useHeaderState()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (headerState == null) {
      return
    }
    const mouseDownHandler = (ev: MouseEvent): void => {
      if (ref.current && !ref.current.contains(ev.target as HTMLElement)) headerState.closeMenu()
    }
    document.addEventListener('mousedown', mouseDownHandler)
    return () => document.removeEventListener('mousedown', mouseDownHandler)
  }, [ref, headerState])
  return (
    <div className="relative inline-block float-right" ref={ref}>
      <ul
        className={`absolute right-0 z-10 bg-contentbg dark:bg-contentbg-dark w-48 rounded-sm border-2 dark:border-low`}
      >
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
