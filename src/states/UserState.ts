import type { UserState } from '@/src/application/states/UserState'
import { createContext, useContext } from 'react'

const UserStateContext = createContext<UserState | null>(null)

export const UserStateProvider = UserStateContext.Provider

export function useUserState(): UserState | null {
  return useContext(UserStateContext)
}
