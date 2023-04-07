import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { CardContent } from '../../ui/common/CardContent'

export default {
  title: 'Common/CardContent',
  component: CardContent,
} satisfies ComponentMeta<typeof CardContent>

export const main: ComponentStory<typeof CardContent> = () => (
  <CardContent content={'Lorem'} imageUrls={[' https://via.placeholder.com/150']} />
)
