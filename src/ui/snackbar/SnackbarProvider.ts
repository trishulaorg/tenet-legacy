import { createContext, useContext } from 'react'

interface Snackbar {
  enqueueError(error: Error): void
  clearError(): void
}

const SnackbarContext = createContext<Snackbar>({
  enqueueError: () => {
    throw new Error('Function not implemented.')
  },
  clearError: () => {
    throw new Error('Function not implemented.')
  },
})

export const SnackbarProvider = SnackbarContext.Provider

export function useSnackbar(): Snackbar {
  return useContext(SnackbarContext)
}
