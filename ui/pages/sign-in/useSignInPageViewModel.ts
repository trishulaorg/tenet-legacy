import { validationErrorMessages } from '@/constants/validationErrorMessages'
import type { EmailAddress } from '@/domain/models/common/EmailAddress'
import type { Password } from '@/domain/models/common/Password'
import type { HandleChangeFactoryType, ValidationErrors } from '@/libs/useForm'
import { useForm } from '@/libs/useForm'
import { zodResolver } from '@/libs/zodResolver'
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
    handleSubmit: () => void
    validationErrors: ValidationErrors<SignInForm>
    handleChangeFactory: HandleChangeFactoryType<SignInForm>
  }
  isLoading: boolean
} {
  const { form, handleChangeFactory, validationErrors } = useForm<SignInForm>({
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
      handleChangeFactory,
      handleSubmit,
      validationErrors,
    },
    isLoading,
  }
}
