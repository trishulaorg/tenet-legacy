import type { SignInParams, SignUpParams } from '@/src/application/apiClient'
import { useApiClient } from '@/src/states/ApiClientState'
import { useSnackbar } from '@/src/ui/snackbar/SnackbarProvider'
import { useEffect, useState } from 'react'

export function useSignUp(): {
  signUp: (params: SignUpParams) => Promise<void>
  isLoading: boolean
} {
  const [isLoading, setIsLoading] = useState(false)
  const apiClient = useApiClient()
  const { enqueueError, clearError } = useSnackbar()

  async function signUp(params: SignInParams): Promise<void> {
    clearError()
    setIsLoading(true)
    try {
      await apiClient.signUp(params)
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
    signUp,
    isLoading,
  }
}
