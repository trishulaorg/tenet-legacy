import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { HomeTab } from '@/src/ui/home/HomeTab'

export default {
  title: 'Home/HomeTab',
  component: HomeTab,
  args: {
    selected: false,
  },
} satisfies ComponentMeta<typeof HomeTab>

export const Default: ComponentStory<typeof HomeTab> = (args) => (
  <HomeTab {...args}>Lorem ipsum</HomeTab>
)
