import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { Title } from '@/src/ui/header/Title'

export default {
  title: 'Header/Title',
  component: Title,
} satisfies ComponentMeta<typeof Title>

export const Default: ComponentStory<typeof Title> = (args) => <Title {...args} />
