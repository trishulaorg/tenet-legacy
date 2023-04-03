import type { HandleChangeFactoryType } from '@/libs/useForm'
import { useForm } from '@/libs/useForm'
import { zodResolver } from '@/libs/zodResolver'
import type { ValidationErrors } from '@/types/ValidationErrors'
import { z } from 'zod'

const validationSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required()

export type SignInForm = z.infer<typeof validationSchema>

export function useSignInPageViewModel(): {
  formState: {
    form: SignInForm
    handleSubmit: () => void
    validationErrors: ValidationErrors<SignInForm>
    handleChangeFactory: HandleChangeFactoryType<SignInForm>
  }
  error?: Error
} {
  const { form, handleChangeFactory, validationErrors } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    validator: zodResolver(validationSchema),
  })

  function handleSubmit(): void {
    return
  }

  return {
    formState: {
      form,
      handleChangeFactory,
      handleSubmit,
      validationErrors,
    },
  }
}
