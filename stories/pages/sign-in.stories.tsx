import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import SignInPage from '@/pages/sign-in'

export default {
  title: 'Pages/SignInPage',
  component: SignInPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies ComponentMeta<typeof SignInPage>

export const Default: ComponentStory<typeof SignInPage> = () => <SignInPage />
