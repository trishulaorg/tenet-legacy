/* eslint-disable */
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'

type Props = {
  src: string[]
}

export default function AttachedImages(props: Props) {
  const { src } = props
  console.log(src)
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
  return (
  <div className='mt-4 grid grid-cols-2 items-center gap-2'>
    {src.map((imageUrl, index) => {
      return(
        <button onClick={() => openImageViewer(index)} key={imageUrl}>
          <img src={imageUrl} className={'w-full h-32 object-cover'}/>
        </button>
      )
    })}
    {isViewerOpen && (
          <ImageViewer
            src={src}
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
  )
}
