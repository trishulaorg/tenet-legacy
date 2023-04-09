import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import TosPage from '@/src/pages/tos'

export default {
  title: 'Pages/TosPage',
  component: TosPage,
} satisfies ComponentMeta<typeof TosPage>

export const Default: ComponentStory<typeof TosPage> = () => <TosPage />
