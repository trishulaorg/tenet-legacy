import type { FC } from 'react'
import React, { useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { ImageWithCloseButton } from '../form/ImageWithCloseButton'
import { ErrorMessage } from '../form/ErrorMessage'

const ImageUpload: FC<{
  files: File[]
  getInputProps: () => Record<string, string>
  removeFile: (file: File) => void
  uploadErrors: Error[]
  isDragActive: boolean
  openFileUploadWindow: () => void
}> = ({ files, getInputProps, removeFile, uploadErrors, isDragActive, openFileUploadWindow }) => {
  const fileUrls = files.map((file) => URL.createObjectURL(file))
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false)
  const [previewFileIndex, setPreviewFileIndex] = useState<number | undefined>(undefined)
  return (
    <>
      <div className={'flex'}>
        {files.map((file, index) => (
          <ImageWithCloseButton
            file={file}
            alt={'uploaded-' + index + file.name}
            key={'uploaded-' + index + file.name}
            onDeleteClick={() => removeFile(file)}
            onImageClick={() => {
              setPreviewFileIndex(index)
              setImagePreviewOpen(true)
            }}
          />
        ))}
      </div>
      {isDragActive ? (
        <p className={'clear-left'}>Drop the Image here ...</p>
      ) : (
        <p className={'clear-left'}>
          <button onClick={openFileUploadWindow}>Click here or Drop Image.</button>
        </p>
      )}
      {uploadErrors.map((error, index) => (
        <ErrorMessage errorMessage={error.message} key={index} />
      ))}
      <input {...getInputProps()} hidden={true} />
      {imagePreviewOpen && (
        <ImageViewer
          src={fileUrls}
          currentIndex={previewFileIndex ?? 0}
          onClose={() => setImagePreviewOpen(false)}
          disableScroll={true}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.95)',
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  )
}

export { ImageUpload }
