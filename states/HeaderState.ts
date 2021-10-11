import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'

import { UserState } from './UserState'

export class HeaderState {
  userState?: UserState
  menuVisibility = false
  personaListVisibility = false
  menuAnchorElement?: HTMLButtonElement
  constructor(userState?: UserState) {
    this.userState = userState
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
    this.userState = undefined
  }
  get isLoggedIn(): boolean {
    return Boolean(this.userState)
  }
}

export const HeaderStateContext = createContext(new HeaderState())
