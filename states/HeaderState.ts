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
  toggleMenu(menuAnchorElement: HTMLButtonElement): void {
    this.menuVisibility = !this.menuVisibility
    this.menuAnchorElement = this.menuVisibility ? menuAnchorElement : undefined
  }
  closeMenu(): void {
    this.menuVisibility = false
    this.menuAnchorElement = undefined
  }
  openMenu(menuAnchorElement: HTMLButtonElement): void {
    this.menuVisibility = true
    this.menuAnchorElement = menuAnchorElement
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
