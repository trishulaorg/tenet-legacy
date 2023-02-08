import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { removeGqlCookie } from '../libs/cookies'

import type { UserState } from './UserState'
import { getUser } from './UserState'

export class HeaderState {
  userState: UserState
  menuVisibility = false
  personaListVisibility = false
  menuAnchorElement?: HTMLButtonElement
  constructor(userState?: UserState) {
    this.userState = userState ?? getUser()
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
    this.userState = getUser()
    removeGqlCookie()
  }
  get isLoggedIn(): boolean {
    return this.userState.token !== 'INVALID_TOKEN'
  }
}

export const HeaderStateContext = createContext<HeaderState | null>(new HeaderState())
