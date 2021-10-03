import { makeAutoObservable } from 'mobx'

import { UserState } from './UserState'

export class HeaderState {
  userState
  menuVisibility = false
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
