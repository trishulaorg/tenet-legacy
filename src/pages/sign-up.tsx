import type { NextPage } from 'next'
import { TextField } from '@/src/ui/form/TextField'
import { Button } from '@/src/ui/common/Button'
import { Form } from '@/src/ui/form/Form'
import { Card } from '@/src/ui/board/Card'
import { CardTitle } from '@/src/ui/common/CardTitle'
import { Paragraph } from '@/src/ui/common/Paragraph'
import { Link } from '@/src/ui/common/Link'
import { useSignUpPageViewModel } from '@/src/ui/sign-up/useSignUpPageViewModel'

const SignUpPage: NextPage = () => {
  const { formState, isLoading } = useSignUpPageViewModel()

  return (
    <div className="flex items-center justify-center">
      <Card className="my-24 flex flex-col items-center max-w-md w-full">
        <CardTitle title="Sign up" />
        <Form onSubmit={formState.handleSubmit}>
          <TextField
            type="email"
            label="Email"
            value={formState.form.email}
            onChange={formState.handleChangeFactory('email')}
            errorMessage={formState.validationErrors.email}
            disabled={isLoading}
          />
          <TextField
            type="password"
            label="Password"
            value={formState.form.password}
            onChange={formState.handleChangeFactory('password')}
            errorMessage={formState.validationErrors.password}
            disabled={isLoading}
          />
          <Button
            className="w-full"
            type="submit"
            label="Sign up"
            size="normal"
            isLoading={isLoading}
            disabled={!formState.isValid}
          />
        </Form>
        <div className="mt-5">
          <Paragraph>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}

export default SignUpPage
