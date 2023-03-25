import type { UserState } from '@/application/states/UserState'

export type HeaderState = Readonly<{
  userState: UserState | null
  menuVisibility: boolean
  personaListVisibility: boolean
  menuAnchorElement?: HTMLButtonElement
  toggleMenu(): void
  closeMenu(): void
  openMenu(): void
  togglePersonaList(): void
  openPersonaList(): void
  closePersonaList(): void
  logIn(userState: UserState): void
  logOut(): void
  isLoggedIn: boolean
  setCurrentPersonaIndex(index: number): void
}>
