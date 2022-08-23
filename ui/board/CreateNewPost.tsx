import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { client, setAuthToken } from '../../libs/fetchAPI'
import { BoardState } from '../../states/PostState'
import { UserStateContext } from '../../states/UserState'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { useRouter } from 'next/router'
import { ImageWithCloseButton } from '../form/ImageWithCloseButton'
import { ErrorMessage } from '../form/ErrorMessage'
import { IMAGE_MIME_TYPE } from '../../libs/types'
import { useDropzone } from 'react-dropzone'

interface CreateNewPostProps {
  boardId: string
  showPostCreate?: boolean
}

export const CreateNewPost: React.FC<CreateNewPostProps> = observer(
  ({ boardId, showPostCreate = true }) => {
    const state = new BoardState(boardId, queryDocuments.Query.post)
    const user = useContext(UserStateContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [uploadErrors, setUploadErrors] = useState<Error[]>([])

    const onClick: FormEventHandler = async (e) => {
      e.preventDefault()

      setAuthToken(user.token)

      await client.createPost({
        title,
        content,
        persona_id: user.currentPersona?.id ?? -1,
        board_id: state.id,
      })
      await mutate(boardId)
      await router.push(`/b/${boardId}`)
    }
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

    return (
      <div {...getRootProps()}>
        <div>
          {showPostCreate === true && user.isValidUser ? (
            <form className="py-4">
              <h2 className="my-2 text-slate-600 text-1xl">Create New Post</h2>
              <label>
                <div>Title</div>
                <input
                  type="text"
                  placeholder="post title"
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  className="w-full leading-6 p-1 border-2 border-black border-opacity-10 rounded-t-lg block mb-1"
                />
              </label>
              <label>
                <div>Content</div>
                <textarea
                  className="w-full leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block mb-2"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.currentTarget.value)}
                  placeholder="What did you think?"
                />
              </label>
              <label>
                <div>Attach Images</div>
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

                <input {...getInputProps()} />
              </label>
              <button className="bg-gray-600 text-white rounded-lg px-4 py-2" onClick={onClick}>
                Create Post
              </button>
            </form>
          ) : null}
        </div>
      </div>
    )
  }
)
