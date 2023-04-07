import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import SettingsPage from '../../pages/settings'

export default {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
} satisfies ComponentMeta<typeof SettingsPage>

export const Default: ComponentStory<typeof SettingsPage> = () => <SettingsPage />
