import { observer } from 'mobx-react'
import router from 'next/router'
import React, { FormEventHandler, useContext } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/fetchAPI'
import { PersonaStateContext } from '../../states/UserState'

export const PersonaCreateSteps: React.FC = observer(() => {
  const persona = useContext(PersonaStateContext)
  const token = getGqlToken()
  const createPersona: FormEventHandler = async (e) => {
    e.preventDefault()
    const query = `
    mutation CreatePersona($name: String!) {
      createPersona(name: $name) {
        name
      }
    }
    `
    await fetcher(query, { name: persona.name }, token)
    router.push('/')
  }

  return (
    <div className="">
      <form>
        <h1 className="my-4 text-slate-600 text-2xl">Create your new persona</h1>
        <input
          type="text"
          value={persona.name}
          placeholder="Insert your persona name here"
          onChange={(e) => persona.updateName(e.target.value)}
          className="w-64 p-2 block rounded border border-slate-300"
        />
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
