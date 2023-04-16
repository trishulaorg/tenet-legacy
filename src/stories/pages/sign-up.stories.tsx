import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import SignUpPage from '@/src/pages/sign-up'

export default {
  title: 'Pages/SignUpPage',
  component: SignUpPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies ComponentMeta<typeof SignUpPage>

export const Default: ComponentStory<typeof SignUpPage> = () => <SignUpPage />
