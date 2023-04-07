import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import CbPage from '@/src/pages/o/cb'

export default {
  title: 'Pages/CbPage',
  component: CbPage,
} satisfies ComponentMeta<typeof CbPage>

export const Default: ComponentStory<typeof CbPage> = () => <CbPage />
