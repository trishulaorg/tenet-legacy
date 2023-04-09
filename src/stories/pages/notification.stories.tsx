import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import NotificationPage from '@/src/pages/notification'

export default {
  title: 'Pages/NotificationPage',
  component: NotificationPage,
} satisfies ComponentMeta<typeof NotificationPage>

export const Default: ComponentStory<typeof NotificationPage> = () => <NotificationPage />
