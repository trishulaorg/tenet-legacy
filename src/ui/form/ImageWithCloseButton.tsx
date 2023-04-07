import type { FC } from 'react'
import React from 'react'

type ImageWithCloseButtonProps = {
  file: File
  alt: string
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onImageClick: () => void
}

const ImageWithCloseButton: FC<ImageWithCloseButtonProps> = ({
  file,
  alt,
  onDeleteClick,
  onImageClick,
}) => {
  return (
    <div role="presentation" className="relative" onClick={onImageClick}>
      <button
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          onDeleteClick(event)
        }}
        className="right-0 absolute"
      >
        <span>&times;</span>
      </button>
      <img className="w-24 h-16 mx-2 my-3 object-cover" src={URL.createObjectURL(file)} alt={alt} />
    </div>
  )
}

export { ImageWithCloseButton }
