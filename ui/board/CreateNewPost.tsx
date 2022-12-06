import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { BoardState } from '../../states/PostState'
import { UserStateContext } from '../../states/UserState'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { IMAGE_MIME_TYPE } from '../../libs/types'
import { useDropzone } from 'react-dropzone'
import { ImageUpload } from '../common/ImageUpload'
import { fetcher } from '../../libs/getClient'
import { getGqlToken } from '../../libs/cookies'

interface CreateNewPostProps {
  boardId: string
  showPostCreate?: boolean
}

export const CreateNewPost: React.FC<CreateNewPostProps> = observer(
  ({ boardId, showPostCreate = true }) => {
    const state = new BoardState({
      id: boardId,
    })
    const user = useContext(UserStateContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [uploadErrors, setUploadErrors] = useState<Error[]>([])

    const onClick: FormEventHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const {
        createPost: { id: createdPostId },
      } = await fetcher({
        operationName: 'createPost',
        variables: {
          title,
          content,
          personaId: user.currentPersona?.id ?? -1,
          boardId: state.id,
        },
        token: getGqlToken(),
      })

      await fetcher({
        operationName: 'putAttachedImage',
        variables: { postId: createdPostId, files: files },
        token: getGqlToken(),
      })

      await mutate(boardId)
      await router.push(`/post/${createdPostId}`)
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
      setFiles(newFiles)
    }

    const { getInputProps, isDragActive, open } = useDropzone({
      noClick: false,
      onDrop,
      multiple: true,
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      },
    })

    return (
      <div>
        <div>
          {showPostCreate === true && user.token !== 'INVALID_TOKEN' ? (
            <div>
              <div className="py-4">
                <h2 className="my-2 text-med dark:text-med-dark text-1xl">Create New Post</h2>
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
                <div>
                  <div>Attach Images</div>
                  <ImageUpload
                    files={files}
                    getInputProps={getInputProps}
                    removeFile={removeFile}
                    uploadErrors={uploadErrors}
                    isDragActive={isDragActive}
                    openFileUploadWindow={open}
                  />
                </div>
                <button className="bg-gray-600 text-white rounded-lg px-4 py-2" onClick={onClick}>
                  Create Post
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)
