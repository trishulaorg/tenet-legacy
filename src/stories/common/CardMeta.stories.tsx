import type { ComponentStory } from '@storybook/react'
import { CardMeta } from '@/src/ui/common/CardMeta'

export default {
  title: 'Common/CardMeta',
  component: CardMeta,
}
// Write storybook story about <CardMeta>
// starts from export
export const CardMetaStory: ComponentStory<typeof CardMeta> = () => (
  <CardMeta isPost={true}>Rolem ipusum</CardMeta>
)
