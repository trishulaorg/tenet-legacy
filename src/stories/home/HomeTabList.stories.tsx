import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { HomeTabList } from '../../ui/home/HomeTabList'

export default {
  title: 'Home/HomeTabList',
  component: HomeTabList,
} satisfies ComponentMeta<typeof HomeTabList>

export const Default: ComponentStory<typeof HomeTabList> = (args) => (
  <HomeTabList {...args}>Lorem ipsum</HomeTabList>
)
