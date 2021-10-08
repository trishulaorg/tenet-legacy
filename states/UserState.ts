import { makeAutoObservable } from 'mobx'

export class UserState {
  personas: PersonaState[] = []
  token
  constructor(token: string) {
    this.token = token
    makeAutoObservable(this, { request: false })
  }
  async request(): Promise<void> {
    const result = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.token,
      },
      body: JSON.stringify({ query: `query  { me { personas { name } } }` }),
    }).then((r) => r.json())
    console.log(result)
  }
}

export class PersonaState {
  name = ''
  constructor() {
    makeAutoObservable(this)
  }
}
