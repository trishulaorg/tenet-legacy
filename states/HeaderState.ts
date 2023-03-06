import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'
import { removeGqlCookie } from '../libs/cookies'

import type { UserState } from './UserState'

export class HeaderState {
  userState: UserState | null
  menuVisibility = false
  personaListVisibility = false
  menuAnchorElement?: HTMLButtonElement
  constructor(userState?: UserState) {
    this.userState = userState ?? null
    makeAutoObservable(this)
  }
  toggleMenu(): void {
    this.menuVisibility = !this.menuVisibility
  }
  closeMenu(): void {
    this.menuVisibility = false
  }
  openMenu(): void {
    this.menuVisibility = true
  }
  togglePersonaList(): void {
    this.personaListVisibility = !this.personaListVisibility
  }
  openPersonaList(): void {
    this.personaListVisibility = true
  }
  closePersonaList(): void {
    this.personaListVisibility = false
  }
  logIn(userState: UserState): void {
    this.userState = userState
  }
  logOut(): void {
    removeGqlCookie()
  }
  get isLoggedIn(): boolean {
    return this.userState != null
  }
}

export const HeaderStateContext = createContext<HeaderState | null>(new HeaderState())

export function useHeaderState(): HeaderState | null {
  return useContext(HeaderStateContext)
}
