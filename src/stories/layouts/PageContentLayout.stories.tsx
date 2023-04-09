import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PageContentLayout } from '@/src/ui/layouts/PageContentLayout'

export default {
  title: 'Layouts/PageContentLayout',
  component: PageContentLayout,
} satisfies ComponentMeta<typeof PageContentLayout>

export const Default: ComponentStory<typeof PageContentLayout> = (args) => (
  <PageContentLayout
    {...args}
    main={<div className="text-low">Hello, world!</div>}
    side={<div className="text-low">Here is the side menu.</div>}
  />
)
