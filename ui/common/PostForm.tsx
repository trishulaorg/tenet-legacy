import { PlusCircleIcon } from '@heroicons/react/solid'
import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { PostFormStateContext } from '../../states/PostFormState'
import { IMAGE_MIME_TYPE } from '../../libs/types'
import { ErrorMessage } from '../form/ErrorMessage'
import { ImageWithCloseButton } from '../form/ImageWithCloseButton'

export const PostFormInner: React.FC = observer(() => {
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [uploadErrors, setUploadErrors] = useState<Error[]>([])
  const state = useContext(PostFormStateContext)
  const onDrop = (acceptedFiles: File[]): void => {
    setUploadErrors([])
    const imageFiles: File[] = []
    acceptedFiles.forEach((file) => {
      if (IMAGE_MIME_TYPE.some((mimeType) => mimeType === file.type)) {
        imageFiles.push(file)
      } else {
        setUploadErrors((prevState) => [
          ...prevState,
          new Error(`"${file.name}" is not a image file.`),
        ])
      }
    })
    const validImageFiles: File[] = []
    imageFiles.forEach((imageFile) => {
      if (imageFile.size < 5 * 1000 * 1000) {
        validImageFiles.push(imageFile)
      } else {
        setUploadErrors((prevState) => [
          ...prevState,
          new Error(`"${imageFile.name}" exceeds the file size limit (5MB).`),
        ])
      }
    })
    setFiles((prevState) => [...prevState, ...validImageFiles])
  }
  const removeFile = (fileToRemove: File): void => {
    const newFiles = files.filter((file) => file !== fileToRemove)
    console.dir(newFiles)
    setFiles(newFiles)
  }
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    onDrop,
    multiple: true,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
  })
  return state.replyTo ? (
    <div className="sticky bottom-0 shadow-2xl" {...getRootProps()}>
      <div className="w-full leading-6 border-t-2 border-black border-opacity-10 rounded-t-lg block bg-white">
        {state.replyTo ? (
          <div className="mt-2 ml-2 p-2 border-l-2 border-gray-200">{state.replyTo?.content}</div>
        ) : null}

        <textarea
          className="w-full p-4"
          rows={4}
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value)
            state.onChange()
          }}
          placeholder="What did you think?"
        />

        <div className={'flex'}>
          {files.map((file, index) => (
            <ImageWithCloseButton
              file={file}
              alt={'uploaded-' + index + file.name}
              key={'uploaded-' + index + file.name}
              onDeleteClick={() => removeFile(file)}
            />
          ))}
        </div>
        {isDragActive ? (
          <p className={'clear-left'}>Drop the Image here ...</p>
        ) : (
          <p className={'clear-left'}>
            <button onClick={open}>Click here or Drop Image.</button>
          </p>
        )}
        {uploadErrors.map((error, index) => (
          <ErrorMessage errorMessage={error.message} key={index} />
        ))}
        <button
          className="absolute bottom-0 right-0 text-green-400 clear-both"
          onClick={() => state.onSubmit(content, files)}
        >
          <PlusCircleIcon height="40" />
        </button>
        <input {...getInputProps()} />
      </div>
    </div>
  ) : null
})
export const PostForm: React.FC = () => {
  return <PostFormInner />
}
