import type { HeaderState } from '@/application/states/HeaderState'
import type { UserState } from '@/application/states/UserState'
import { removeGqlCookie } from '@/libs/cookies'
import { makeAutoObservable } from 'mobx'

export class HeaderStateImpl implements HeaderState {
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
  setCurrentPersonaIndex(index: number): void {
    this.userState?.setCurrentPersonaIndex(index)
  }
  get isLoggedIn(): boolean {
    return this.userState != null
  }
}
