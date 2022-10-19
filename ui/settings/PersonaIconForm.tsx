import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { UserStateContext } from '../../states/UserState'
import { ErrorMessage } from '../form/ErrorMessage'
import { ApolloError } from '@apollo/client'
import { SuccessMessage } from '../form/SuccessMessage'
import { client, setAuthToken } from '../../libs/fetchAPI'

const PersonaIconForm: React.FC = observer(() => {
  const userState = useContext(UserStateContext)
  const token = getGqlToken()
  const [personaIconErrorMessage, setPersonaIconErrorMessage] = useState<string | null>(null)
  const [personaIconSuccessMessage, setPersonaIconSuccessMessage] = useState<string | null>(null)
  const [files, setFile] = useState<{ [index: number]: File }>([])

  const onIconSet = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return
    }
    setFile(e.target.files)
  }

  const setPersonaIcon: FormEventHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPersonaIconSuccessMessage(null)
    setPersonaIconErrorMessage(null)
    try {
      setAuthToken(token)
      await client.setPersonaIcon({
        personaId: userState.currentPersona?.id ?? -1,
        file: files[0] ?? new File([], ''),
      })
      setPersonaIconSuccessMessage('New icon is Successfully set!')
    } catch (error) {
      if (error instanceof ApolloError) {
        setPersonaIconErrorMessage(error.message)
      }
    }
  }

  return (
    <div>
      <form>
        <h1 className="my-4 text-slate-600 text-2xl">Icon for {userState.currentPersona?.name}</h1>
        <input
          type="file"
          onChange={onIconSet}
          multiple={false}
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
        />

        {personaIconErrorMessage && <ErrorMessage errorMessage={personaIconErrorMessage} />}
        {personaIconSuccessMessage && <SuccessMessage successMessage={personaIconSuccessMessage} />}

        <button
          onClick={(e) => setPersonaIcon(e)}
          className="my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300"
        >
          Set Icon
        </button>
      </form>
    </div>
  )
})

export { PersonaIconForm }
