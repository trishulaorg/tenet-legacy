import { observer } from 'mobx-react'
import router from 'next/router'
import React, { FormEventHandler, useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/fetchAPI'
import { PersonaStateContext } from '../../states/UserState'
import { ClientError, gql } from 'graphql-request'
import { ErrorMessage } from '../form/ErrorMessage'
import { getValidationErrors, isUniqueConstraintError } from '../../server/errorResolver'

interface ResultT {
  createPersona: { name: string; screenName: string }
}

export const PersonaCreateSteps: React.FC = observer(() => {
  const persona = useContext(PersonaStateContext)
  const token = getGqlToken()
  const [personaScreenNameErrorMessage, setPersonaScreenNameErrorMessage] = useState('')
  const [personaNameErrorMessage, setPersonaNameErrorMessage] = useState('')
  const createPersona: FormEventHandler = async (e) => {
    e.preventDefault()
    const query = gql`
      mutation CreatePersona($screenName: String!, $name: String!, $iconPath: String!) {
        createPersona(screenName: $screenName, name: $name, iconPath: $iconPath) {
          name
          screenName
        }
      }
    `
    try {
      await fetcher<ResultT>(
        query,
        { screenName: persona.screenName, name: persona.name, iconPath: '' },
        token
      )
      await router.push('/')
    } catch (error) {
      if (error instanceof ClientError) {
        const validationErrors = getValidationErrors(error)
        validationErrors.forEach((zodIssue) => {
          switch (zodIssue.path.join('')) {
            case 'name':
              setPersonaNameErrorMessage(
                personaNameErrorMessage
                  ? zodIssue.message
                  : personaNameErrorMessage + '\n' + zodIssue.message
              )
              break
            case 'screenName':
              setPersonaScreenNameErrorMessage(
                personaScreenNameErrorMessage
                  ? zodIssue.message
                  : personaScreenNameErrorMessage + '\n' + zodIssue.message
              )
              break
            default:
              break
          }
        })
        if (isUniqueConstraintError(error)) {
          const uniqueConstraintErrorMessage = 'This ID has already been taken'
          setPersonaNameErrorMessage(
            personaScreenNameErrorMessage
              ? uniqueConstraintErrorMessage
              : personaScreenNameErrorMessage + '\n' + uniqueConstraintErrorMessage
          )
        }
      }
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
          <ErrorMessage errorMessage={personaNameErrorMessage} />
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
          <ErrorMessage errorMessage={personaScreenNameErrorMessage} />
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
