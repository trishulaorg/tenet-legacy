import type { NextPage } from 'next'
import { TextField } from '@/src/ui/form/TextField'
import { Button } from '@/src/ui/common/Button'
import { Form } from '@/src/ui/form/Form'
import { Card } from '@/src/ui/board/Card'
import { CardTitle } from '@/src/ui/common/CardTitle'
import { Paragraph } from '@/src/ui/common/Paragraph'
import { Link } from '@/src/ui/common/Link'
import { useSignInPageViewModel } from '@/src/ui/sign-in/useSignInPageViewModel'

const SignInPage: NextPage = () => {
  const { formState, isLoading } = useSignInPageViewModel()

  return (
    <div className="flex items-center justify-center">
      <Card className="my-24 flex flex-col items-center max-w-md w-full">
        <CardTitle title="Sign in" />
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
            value={formState.form.password.y}
            onChange={formState.handleChangeFactory('password.y')}
            errorMessage={formState.validationErrors.password?.y}
            disabled={isLoading}
          />
          <Button
            className="w-full"
            type="submit"
            label="Sign in"
            size="normal"
            isLoading={isLoading}
            disabled={!formState.isValid}
          />
        </Form>
        <div className="mt-5">
          <Paragraph>
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
          </Paragraph>
          <Paragraph>
            Forgot password? <Link href="/reset-password">Reset password</Link>
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}

export default SignInPage
