import type { HeaderState } from '@/src/application/states/HeaderState'
import { createContext, useContext } from 'react'

const HeaderStateContext = createContext<HeaderState | null>(null)

export const HeaderStateProvider = HeaderStateContext.Provider

export function useHeaderState(): HeaderState | null {
  return useContext(HeaderStateContext)
}
