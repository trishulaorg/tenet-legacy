import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'

export default {
  title: 'Layouts/PageBaseLayout',
  component: PageBaseLayout,
} satisfies ComponentMeta<typeof PageBaseLayout>

export const Default: ComponentStory<typeof PageBaseLayout> = (args) => (
  <PageBaseLayout {...args}>
    <div className="text-low p-3">Hello, world!</div>
  </PageBaseLayout>
)
