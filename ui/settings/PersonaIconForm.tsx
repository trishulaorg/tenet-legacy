import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { UserStateContext } from '../../states/UserState'
import type { ClientError } from 'graphql-request'
import { ErrorMessage } from '../form/ErrorMessage'
import { getValidationErrors } from '../../server/errorResolver'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import gql from 'graphql-tag'
import { ApolloClient, ApolloError, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { SuccessMessage } from '../form/SuccessMessage'

const PersonaIconForm: React.FC = observer(() => {
  const userState = useContext(UserStateContext)
  const token = getGqlToken()
  const [personaIconErrorMessage, setPersonaIconErrorMessage] = useState('')
  const [personaIconSuccessMessage, setPersonaIconSuccessMessage] = useState('')
  const [files, setFile] = useState<{ [index: number]: File }>([])

  const onIconSet = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return
    }
    setFile(e.target.files)
  }

  const setPersonaIcon: FormEventHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPersonaIconSuccessMessage('')
    setPersonaIconErrorMessage('')
    try {
      const uploadClient = new ApolloClient({
        uri: '/api/graphql',
        cache: new InMemoryCache(),
        link: createUploadLink({
          uri: '/api/graphql',
          headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }),
      })
      await uploadClient.mutate({
        mutation: gql(queryDocuments.Mutation.setPersonaIcon),
        variables: { personaId: userState.currentPersona?.id ?? -1, file: files[0] },
      })
      setPersonaIconSuccessMessage('New icon is Successfully set!')
    } catch (error) {
      console.dir(error)
      if (error instanceof ApolloError) {
        error.clientErrors.forEach((e) => {
          const validationErrors = getValidationErrors(e as ClientError)
          validationErrors.forEach((zodIssue) => {
            switch (zodIssue.path.join('')) {
              case 'name':
                setPersonaIconErrorMessage(
                  personaIconErrorMessage
                    ? zodIssue.message
                    : personaIconErrorMessage + '\n' + zodIssue.message
                )
                break
              default:
                break
            }
          })
        })
        if (personaIconErrorMessage === '') {
          setPersonaIconErrorMessage(error.message)
        }
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
          accept="image/png, image/jpeg, image/gif, image/bmp, image/svg+xml"
        />
        <ErrorMessage errorMessage={personaIconErrorMessage} />
        <SuccessMessage successMessage={personaIconSuccessMessage} />
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
