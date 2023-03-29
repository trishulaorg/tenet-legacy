import type { PersonaName } from '@/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useState } from 'react'
import { ErrorMessage } from '../form/ErrorMessage'

type Form = {
  name: PersonaName
  screenName: PersonaScreenName
}

export const PersonaCreateSteps: React.FC = observer(() => {
  const [personaScreenNameErrorMessage] = useState('')
  const [personaNameErrorMessage] = useState('')
  const createPersona: FormEventHandler = async (e) => {
    e.preventDefault()
  }
  const [formState, setFormState] = useState<Form>({
    name: '' as PersonaName,
    screenName: '' as PersonaScreenName,
  })

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState((prev) => ({
      ...prev,
      name: e.target.value as PersonaName,
    }))
  }

  function handleChangeScreenName(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState((prev) => ({
      ...prev,
      screenName: e.target.value as PersonaScreenName,
    }))
  }

  return (
    <div className="">
      <form>
        <h1 className="my-4 text-med dark:text-med-dark text-2xl">Create your new persona</h1>
        <label>
          Your id (must be unique)
          <input
            type="text"
            value={formState.name}
            placeholder="e.g. test"
            onChange={handleChangeName}
            className="w-64 p-2 block rounded border border-slate-300"
          />
          <ErrorMessage errorMessage={personaNameErrorMessage} />
        </label>
        <label>
          Your screen name
          <input
            type="text"
            value={formState.screenName}
            placeholder="e.g. Test User"
            onChange={handleChangeScreenName}
            className="w-64 p-2 block rounded border border-slate-300"
          />
          <ErrorMessage errorMessage={personaScreenNameErrorMessage} />
        </label>
        <label>
          Icon
          <input type="file" />
          <ErrorMessage errorMessage={''} />
        </label>
        <button
          onClick={(e) => createPersona(e)}
          className="my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300"
        >
          OK
        </button>
      </form>
    </div>
  )
})
