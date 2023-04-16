import React from 'react'
import type { ComponentStory } from '@storybook/react'
import iconImage from '@/src/stories/static/icon.png'
import { AttachedImage } from '@/src/ui/common/AttachedImage'

export default {
  title: 'Common/AttachedImage',
  component: AttachedImage,
}

const Template: ComponentStory<typeof AttachedImage> = (args) => <AttachedImage {...args} />

export const Default = Template.bind({})
Default.args = {
  src: iconImage.src,
  alt: 'alt',
}
