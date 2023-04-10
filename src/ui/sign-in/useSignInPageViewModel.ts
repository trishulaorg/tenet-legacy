import { validationErrorMessages } from '@/src/constants/validationErrorMessages'
import type { EmailAddress } from '@/src/domain/models/common/EmailAddress'
import type { Password } from '@/src/domain/models/common/Password'
import type { HandleChangeFactoryType, ValidationErrors } from '@/src/libs/useForm'
import { useForm } from '@/src/libs/useForm'
import { zodResolver } from '@/src/libs/zodResolver'
import { z } from 'zod'
import { useSignIn } from './useSignIn'

const validationSchema = z.object({
  email: z.string().nonempty(validationErrorMessages.required).email(validationErrorMessages.email),
  password: z.object({
    y: z.string().nonempty(validationErrorMessages.required),
  }),
})

export type SignInForm = z.infer<typeof validationSchema>

export function useSignInPageViewModel(): {
  formState: {
    form: SignInForm
    isValid: boolean
    handleSubmit: () => void
    validationErrors: ValidationErrors<SignInForm>
    handleChangeFactory: HandleChangeFactoryType<SignInForm>
  }
  isLoading: boolean
} {
  const { form, handleChangeFactory, validationErrors, isValid } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: {
        y: '',
      },
    },
    validator: zodResolver(validationSchema),
  })

  const { signIn, isLoading } = useSignIn()

  function handleSubmit(): void {
    signIn({
      emailAddress: form.email as EmailAddress,
      password: form.password.y as Password,
    })
  }

  return {
    formState: {
      form,
      isValid,
      handleChangeFactory,
      handleSubmit,
      validationErrors,
    },
    isLoading,
  }
}
