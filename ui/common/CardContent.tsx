import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { MultiLineText } from './MultiLineText'

interface CardContentProps {
  content: string
  isPost?: boolean
  imageUrls?: string[]
}

export const CardContent: React.FC<CardContentProps> = ({
  content,
  isPost = true,
  imageUrls = [],
}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = (): void => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const style = isPost ? 'px-6 pb-8 text-med dark:text-med-dark' : 'pl-4 pb-8 text-med dark:text-med-dark'
  return (
    <div className={style}>
      <p>
        <MultiLineText text={content} />
      </p>
      <div className={'mt-4 grid grid-cols-2 items-center gap-2'}>
        {imageUrls.map((imageUrl, index) => (
          <button onClick={() => openImageViewer(index)} key={imageUrl}>
            <img
              src={imageUrl}
              alt={`attached ${index + 1}`}
              className={'w-full h-32 object-cover'}
            />
          </button>
        ))}
        {isViewerOpen && (
          <ImageViewer
            src={imageUrls}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={true}
            backgroundStyle={{
              backgroundColor: 'rgba(0,0,0,0.95)',
            }}
            closeOnClickOutside={true}
          />
        )}
      </div>
    </div>
  )
}
