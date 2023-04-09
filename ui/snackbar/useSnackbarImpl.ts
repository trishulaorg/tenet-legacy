import { useSnackbar as useNotistack, closeSnackbar } from 'notistack'
import { useState } from 'react'

export function useSnackbarImpl(): {
  enqueueError(error: Error): void
  clearError(): void
} {
  const { enqueueSnackbar } = useNotistack()
  const [key, setKey] = useState<string | number>()

  function enqueueError(error: Error): void {
    clearError()
    setKey(
      enqueueSnackbar(error.message, {
        variant: 'error',
        persist: true,
      })
    )
  }

  function clearError(): void {
    if (key != null) {
      closeSnackbar(key)
    }
  }

  return {
    enqueueError,
    clearError,
  }
}
