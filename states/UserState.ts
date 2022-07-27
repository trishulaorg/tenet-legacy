import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { gql } from 'graphql-request'

export class UserState {
  _personas: PersonaState[]
  token
  currentPersonaIndex: number
  requested: boolean
  constructor(token: string, personas: PersonaState[], currentPersonaIndex: number) {
    this.token = token
    this._personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    this.requested = false
    makeAutoObservable(this)
  }
  get isValidUser(): boolean {
    return this.requested && this.token !== 'INVALID_TOKEN'
  }
  set isValidUser(value: boolean) {
    this.requested = value
  }
  async request(): Promise<void> {
    const result = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify({
        query: gql`
          query {
            me {
              personas {
                id
                name
                screenName
                iconUrl
              }
            }
          }
        `,
      }),
    }).then((r) => r.json())
    this.isValidUser = !result.me
    this.personas = result.data.me?.personas?.map(
      (v: { id: number; name: string; iconUrl: string; screenName: string }) => new PersonaState(v)
    )
  }
  set personas(personas: PersonaState[] | undefined) {
    this._personas = personas ?? []
  }

  get personas(): PersonaState[] {
    return this._personas
  }
  get currentPersona(): PersonaState | undefined {
    return this.personas?.length > 0 ? this.personas[this.currentPersonaIndex] : undefined
  }
}

export class PersonaState {
  name: string
  iconUrl: string
  id: number
  screenName: string
  constructor(data: { id: number; name: string; screenName: string; iconUrl?: string }) {
    this.name = data.name
    this.screenName = data.screenName
    this.iconUrl = data.iconUrl ?? ''
    this.id = data.id
    makeAutoObservable(this)
  }
  updateName(name: string): void {
    this.name = name
  }
  updateScreenName(name: string): void {
    this.screenName = name
  }
}

export const UserStateContext = createContext(new UserState('', [], 0))
export const PersonaStateContext = createContext(
  new PersonaState({ id: -1, name: '', screenName: '' })
)

export const defaultUser: () => UserState = () => new UserState('INVALID_TOKEN', [], 0)
