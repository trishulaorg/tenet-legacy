import type { SignInParams } from '@/application/apiClient'
import { useApiClient } from '@/states/ApiClientState'
import { useSnackbar } from '@/ui/snackbar/SnackbarProvider'
import { useEffect, useState } from 'react'

export function useSignIn(): {
  signIn: (params: SignInParams) => Promise<void>
  isLoading: boolean
} {
  const [isLoading, setIsLoading] = useState(false)
  const apiClient = useApiClient()
  const { enqueueError, clearError } = useSnackbar()

  async function signIn(params: SignInParams): Promise<void> {
    clearError()
    setIsLoading(true)
    try {
      await apiClient.signIn(params)
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err
      }
      enqueueError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // clear error when unmount
  useEffect(() => {
    return clearError
  }, [clearError])

  return {
    signIn,
    isLoading,
  }
}
