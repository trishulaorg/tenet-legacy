import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'

export class UserState {
  personas: PersonaState[] = []
  token
  currentPersonaIndex: number
  constructor(token: string, personas: PersonaState[], currentPersonaIndex: number) {
    this.token = token
    this.personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    makeAutoObservable(this, { request: false })
  }
  get isValidUser(): boolean {
    return this.token !== ''
  }
  async request(): Promise<void> {
    await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.token,
      },
      body: JSON.stringify({
        query: `
        query {
          me {
            personas {
              name
              iconUrl
            }
          } 
        }`,
      }),
    }).then((r) => r.json())
  }
  get currentPersona(): PersonaState {
    return this.personas[this.currentPersonaIndex]
  }
}

export class PersonaState {
  name: string
  iconUrl: string
  constructor(name: string, iconUrl = '') {
    this.name = name
    this.iconUrl = iconUrl
    makeAutoObservable(this)
  }
}

export const UserStateContext = createContext(new UserState('', [], 0))
export const PersonaStateContext = createContext(new PersonaState(''))
