import { useRouter } from 'next/router'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { client, setAuthToken } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import {
  getValidationErrors,
  isClientError,
  isUniqueConstraintError,
} from '../../server/errorResolver'
import { InputWithLabel } from '../form/InputWithLabel'
import { ErrorMessage } from '../form/ErrorMessage'

export const CreateNewBoard: React.FC = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [overallErrorMessage, setOverallErrorMessage] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('')
  const user = useContext(UserStateContext)
  const persona = user.currentPersona
  const token = getGqlToken()
  const router = useRouter()
  const onClick: FormEventHandler = async (e) => {
    e.preventDefault()
    setTitleErrorMessage('')
    setDescriptionErrorMessage('')
    if (!persona) {
      setOverallErrorMessage('You must sign in to create a Board.')
      return
    }
    try {
      setAuthToken(token)
      const {
        createBoard: { id },
      } = await client.createBoard({ title: name, description: desc, personaId: persona.id })

      await router.push(`/b/${id}`)
    } catch (error) {
      if (isClientError(error)) {
        const validationErrors = getValidationErrors(error)
        validationErrors.forEach((zodIssue) => {
          switch (zodIssue.path.join('')) {
            case 'title':
              setTitleErrorMessage(
                titleErrorMessage ? zodIssue.message : titleErrorMessage + '\n' + zodIssue.message
              )
              break
            case 'description':
              setDescriptionErrorMessage(
                titleErrorMessage ? zodIssue.message : titleErrorMessage + '\n' + zodIssue.message
              )
              break
            default:
              break
          }
        })
        if (isUniqueConstraintError(error)) {
          setTitleErrorMessage('A Board with the title already exists!')
        }
      }
    }
  }
  return (
    <div>
      <h1 className="my-4 text-slate-600 text-2xl">Create new board</h1>
      <form>
        <InputWithLabel
          label="Board Name"
          value={name}
          setValue={setName}
          errorMessage={titleErrorMessage}
        />
        <InputWithLabel
          label="Description"
          value={desc}
          setValue={setDesc}
          errorMessage={descriptionErrorMessage}
          inputElement={
            <textarea
              className="flex-1 border rounded-sm border border-slate-300"
              onChange={(e) => setDesc(e.currentTarget.value)}
              value={desc}
            />
          }
        />
        {overallErrorMessage && <ErrorMessage errorMessage={overallErrorMessage} />}
        <button
          className="my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300"
          onClick={onClick}
        >
          Create
        </button>
      </form>
    </div>
  )
}
