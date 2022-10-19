import { makeAutoObservable } from 'mobx'
import type { Channel } from 'pusher-js/with-encryption'
import { createContext } from 'react'
import { queryDocuments } from '../server/graphql-schema/queryDocuments'

export class UserState {
  _personas: PersonaState[]
  token
  currentPersonaIndex: number
  requested: boolean
  _notifications: Notification[]
  constructor(token: string, personas: PersonaState[], currentPersonaIndex: number) {
    this.token = token
    this._personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    this.requested = false
    this._notifications = []
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
        query: queryDocuments.Query.me,
      }),
    }).then((r) => r.json())
    console.log(result)
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

  subscribeNotifications<T = Record<string, string>>(
    channel: Channel,
    eventName: string,
    cb: (notification: Notification<T>) => void
  ): void {
    channel.bind(eventName, (data: T): void => {
      const n: Notification<T> = {
        channel: channel.name,
        eventName,
        data,
      }
      console.log(n)
      this.notifications.push(n)
      cb(n)
    })
  }

  set notifications(notifications: Notification[]) {
    this._notifications = notifications
  }
  get notifications(): Notification[] {
    return this._notifications
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

export interface Notification<T = unknown> {
  channel: string
  eventName: string
  data: T
}

export interface TypingStateNotification
  extends Notification<{
    createdAt: string
    authorPersonaId: number
    authorPersonaScreenName: string
  }> {
  eventName: 'typing'
}
