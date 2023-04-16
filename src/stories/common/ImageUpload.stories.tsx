import React from 'react'
import type { ComponentStory } from '@storybook/react'
import { ImageUpload } from '@/src/ui/common/ImageUpload'

export default {
  title: 'Common/ImageUpload',
  component: ImageUpload,
}

const Template: ComponentStory<typeof ImageUpload> = (args) => <ImageUpload {...args} />

export const Default = Template.bind({})
Default.args = {
  files: [],
  getInputProps: () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFile: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openFileUploadWindow: () => {},
  uploadErrors: [],
  isDragActive: false,
}
