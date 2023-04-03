import type { NextPage } from 'next'
import { useSignInPageViewModel } from '@/ui/pages/sign-in/useSignInPageViewModel'
import { TextField } from '@/ui/form/TextField'
import { Button } from '@/ui/common/Button'
import { Form } from '@/ui/form/Form'
import { Card } from '@/ui/board/Card'
import { CardTitle } from '@/ui/common/CardTitle'
import { Paragraph } from '@/ui/common/Paragraph'
import { Link } from '@/ui/common/Link'

const SignInPage: NextPage = () => {
  const { formState } = useSignInPageViewModel()

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="flex flex-col items-center max-w-md w-full">
        <CardTitle title="Sign in" />
        <Form onSubmit={formState.handleSubmit}>
          <TextField
            type="email"
            label="Email"
            value={formState.form.email}
            onChange={formState.handleChangeFactory<['email']>(['email'])}
            errorMessage={formState.validationErrors.email}
          />
          <TextField
            type="password"
            label="Password"
            value={formState.form.password}
            onChange={formState.handleChangeFactory<['password']>(['password'])}
            errorMessage={formState.validationErrors.password}
          />
          <Button className="w-full" type="submit" label="Sign in" size="normal" />
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
