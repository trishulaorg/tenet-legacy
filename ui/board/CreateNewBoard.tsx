import { useRouter } from 'next/router'
import React, { FormEventHandler, useContext, useState } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import { ClientError, gql } from 'graphql-request'
import { isUniqueConstraintError } from '../../server/errorResolver'

interface ResultT {
  id: number
}

export const CreateNewBoard: React.FC = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const user = useContext(UserStateContext)
  const persona = user.currentPersona
  const token = getGqlToken()
  const router = useRouter()
  const onClick: FormEventHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!persona) {
      return
    }
    const query = gql`
      mutation CreateBoard($title: String!, $description: String!, $personaId: Int!) {
        createBoard(title: $title, description: $description, personaId: $personaId) {
          id
        }
      }
    `
    try {
      await fetcher<ResultT>(
        query,
        { title: name, description: desc, personaId: persona.id },
        token
      )
      await router.push('/')
    } catch (error) {
      if (error instanceof ClientError) {
        if (isUniqueConstraintError(error)) {
          setErrorMessage('A Board with the title already exists!')
        }
      }
    }
  }
  return (
    <div>
      <h1 className="my-4 text-slate-600 text-2xl">Create new board</h1>
      <form>
        <div className="p-1">
          <label className="flex">
            <span className="w-40 flex-shrink-0">Board Name</span>
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="flex-1 rounded border border-slate-300 overflow-auto"
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
              />
              <div className={'text-red-600'}>{errorMessage}</div>
            </div>
          </label>
        </div>
        <div className="p-1">
          <label className="flex">
            <span className="w-40">Description</span>
            <textarea
              className="flex-1 border rounded-sm border border-slate-300"
              onChange={(e) => setDesc(e.currentTarget.value)}
              value={desc}
            />
          </label>
        </div>
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
