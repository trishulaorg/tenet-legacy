import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { CreatedAt } from '@/src/ui/common/CreatedAt'
export default {
  title: 'Common/CreatedAt',
  component: CreatedAt,
}

const Template: ComponentStory<typeof CreatedAt> = (args) => <CreatedAt {...args} />

export const Default = Template.bind({})
Default.args = {
  createdAt: new Date(2023, 0, 1, 0, 0, 0, 0),
}
