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
    const result = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
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
    this.personas = result.data.me?.personas.map(
      (v: { name: string; iconUrl: string }) => new PersonaState(v)
    )
  }
  get currentPersona(): PersonaState | undefined {
    return this.personas ? this.personas[this.currentPersonaIndex] : undefined
  }
}

export class PersonaState {
  name: string
  iconUrl: string
  constructor(data: { name: string; iconUrl?: string }) {
    this.name = data.name
    this.iconUrl = data.iconUrl ?? ''
    makeAutoObservable(this)
  }
  updateName(name: string): void {
    this.name = name
  }
}

export const UserStateContext = createContext(new UserState('', [], 0))
export const PersonaStateContext = createContext(new PersonaState({ name: '' }))
