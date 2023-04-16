import { validationErrorMessages } from '@/src/constants/validationErrorMessages'
import type { EmailAddress } from '@/src/domain/models/common/EmailAddress'
import type { Password } from '@/src/domain/models/common/Password'
import type { HandleChangeFactoryType, ValidationErrors } from '@/src/libs/useForm'
import { useForm } from '@/src/libs/useForm'
import { zodResolver } from '@/src/libs/zodResolver'
import { z } from 'zod'
import { useSignUp } from './useSignUp'
import { passwordPolicy } from '@/src/libs/passwordPolicy'

const validationSchema = z.object({
  email: z.string().nonempty(validationErrorMessages.required).email(validationErrorMessages.email),
  password: z
    .string()
    .min(8, validationErrorMessages.passwordMin)
    .max(100, validationErrorMessages.passwordMax)
    .regex(passwordPolicy, validationErrorMessages.passwordPolicy)
    .nonempty(validationErrorMessages.required),
})

export type SignUpForm = z.infer<typeof validationSchema>

export function useSignUpPageViewModel(): {
  formState: {
    form: SignUpForm
    isValid: boolean
    handleSubmit: () => void
    validationErrors: ValidationErrors<SignUpForm>
    handleChangeFactory: HandleChangeFactoryType<SignUpForm>
  }
  isLoading: boolean
} {
  const { form, handleChangeFactory, validationErrors, isValid } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    validator: zodResolver(validationSchema),
  })

  const { signUp, isLoading } = useSignUp()

  function handleSubmit(): void {
    signUp({
      emailAddress: form.email as EmailAddress,
      password: form.password as Password,
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
