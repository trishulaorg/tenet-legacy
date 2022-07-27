import { observer } from 'mobx-react'
import router from 'next/router'
import React, { FormEventHandler, useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/fetchAPI'
import { PersonaStateContext } from '../../states/UserState'
import { gql } from 'graphql-request'

interface ResultT {
  createPersona: { name: string; screenName: string }
}

export const PersonaCreateSteps: React.FC = observer(() => {
  const persona = useContext(PersonaStateContext)
  const token = getGqlToken()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const createPersona: FormEventHandler = async (e) => {
    e.preventDefault()
    const query = gql`
      mutation CreatePersona($screenName: String!, $name: String!) {
        createPersona(screenName: $screenName, name: $name) {
          name
          screenName
        }
      }
    `
    try {
      await fetcher<ResultT>(query, { screenName: persona.screenName, name: persona.name }, token)
      await router.push('/')
    } catch (e) {
      setErrorMsg('This ID has already been taken')
    }
  }

  return (
    <div className="">
      <form>
        <h1 className="my-4 text-slate-600 text-2xl">Create your new persona</h1>
        <label>
          Your id (must be unique)
          <input
            type="text"
            value={persona.name}
            placeholder="e.g. test"
            onChange={(e) => persona.updateName(e.target.value)}
            className="w-64 p-2 block rounded border border-slate-300"
          />
        </label>
        <label>
          Your screen name
          <input
            type="text"
            value={persona.screenName}
            placeholder="e.g. Test User"
            onChange={(e) => persona.updateScreenName(e.target.value)}
            className="w-64 p-2 block rounded border border-slate-300"
          />
        </label>
        {errorMsg ? <div className="text-red-500 font-bold">Error: {errorMsg}</div> : null}
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
