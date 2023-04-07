import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { FollowingBoardCard } from '../../ui/menu/FollowingBoardCard'

export default {
  title: 'Menu/FollowingBoardCard',
  component: FollowingBoardCard,
  args: {
    boards: Array(10)
      .fill(null)
      .map((_, i) => ({
        board: {
          id: `${i + 1}`,
          title: `lorem ipsum ${i + 1}`,
        },
      })),
  },
} satisfies ComponentMeta<typeof FollowingBoardCard>

export const Default: ComponentStory<typeof FollowingBoardCard> = (args) => (
  <FollowingBoardCard {...args} />
)
