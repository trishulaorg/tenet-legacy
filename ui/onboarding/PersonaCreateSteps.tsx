import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { PersonaStateContext } from '../../states/UserState'
import { ErrorMessage } from '../form/ErrorMessage'

export const PersonaCreateSteps: React.FC = observer(() => {
  const persona = useContext(PersonaStateContext)
  const [personaScreenNameErrorMessage] = useState('')
  const [personaNameErrorMessage] = useState('')
  const createPersona: FormEventHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="">
      <form>
        <h1 className="my-4 text-med dark:text-med-dark text-2xl">Create your new persona</h1>
        <label>
          Your id (must be unique)
          <input
            type="text"
            value={persona.name}
            placeholder="e.g. test"
            onChange={(e) => persona.updateName(e.target.value as PersonaName)}
            className="w-64 p-2 block rounded border border-slate-300"
          />
          <ErrorMessage errorMessage={personaNameErrorMessage} />
        </label>
        <label>
          Your screen name
          <input
            type="text"
            value={persona.screenName}
            placeholder="e.g. Test User"
            onChange={(e) => persona.updateScreenName(e.target.value as PersonaScreenName)}
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
