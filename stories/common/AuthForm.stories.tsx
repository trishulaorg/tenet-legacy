// write storybook stories for <AuthForm/>
import type { ComponentStory } from '@storybook/react'
import { AuthForm } from '../../ui/common/AuthForm'

export default {
  title: 'Common/AuthForm',
  component: AuthForm,
}

export const AuthFormStory: ComponentStory<typeof AuthForm> = () => <AuthForm />
