import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import type { ComponentProps, ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { ImageWithCloseButton } from '@/src/ui/form/ImageWithCloseButton'
import image from '@/src/stories/static/wallpaper.jpg'

function StoryComponent(
  props: Omit<ComponentProps<typeof ImageWithCloseButton>, 'file'> & {
    fileUrl: string
  }
): ReactElement {
  const { fileUrl, alt, onDeleteClick, onImageClick } = props
  const [file, setFile] = useState<File | null>(null)
  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        setFile(new File([blob], 'image'))
      })
  }, [fileUrl])
  if (file == null) {
    return <>loading...</>
  }
  return (
    <ImageWithCloseButton
      file={file}
      alt={alt}
      onDeleteClick={onDeleteClick}
      onImageClick={onImageClick}
    />
  )
}

export default {
  title: 'Form/ImageWithCloseButton',
  component: StoryComponent,
  argTypes: {
    onDeleteClick: { action: 'onDeleteClick' },
    onImageClick: { action: 'onImageClick' },
  },
  args: {
    fileUrl: image as unknown as string,
    alt: 'This is some kind of image.',
  },
} satisfies ComponentMeta<typeof StoryComponent>

export const Default: ComponentStory<typeof StoryComponent> = (args) => <StoryComponent {...args} />
