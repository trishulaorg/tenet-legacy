import type { FormEventHandler } from 'react'
import React, { useState } from 'react'
import { InputWithLabel } from '../form/InputWithLabel'
import { ErrorMessage } from '../form/ErrorMessage'
import { useUserState } from '@/src/states/UserState'

export const CreateNewBoard: React.FC = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [overallErrorMessage, setOverallErrorMessage] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('')
  const userState = useUserState()
  if (userState == null) {
    return null
  }
  const persona = userState.currentPersona
  const onClick: FormEventHandler = async (e) => {
    e.preventDefault()
    setTitleErrorMessage('')
    setDescriptionErrorMessage('')
    if (!persona) {
      setOverallErrorMessage('You must sign in to create a Board.')
      return
    }
  }
  return (
    <div>
      <h1 className="my-4 text-med dark:text-med-dark text-2xl">Create new board</h1>
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
