import { makeAutoObservable } from 'mobx'
import type { Channel } from 'pusher-js/with-encryption'
import { createContext } from 'react'
import { getCookies } from '../libs/cookies'
import { fetcher } from '../libs/getClient'

interface GetMe {
  me: {
    personas: {
      id: string
      name: string
      screenName: string
      iconUrl: string
    }[]
  }
}
export class UserState {
  _personas: PersonaState[]
  token
  currentPersonaIndex: number
  _notifications: Notification[]
  _requested = false
  constructor(token: string, personas: PersonaState[], currentPersonaIndex: number) {
    this.token = token
    this._personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    this._notifications = []
    this._requested = false
    makeAutoObservable(this)
  }
  set requested(value: boolean) {
    this._requested = value
  }
  get requested(): boolean {
    return this._requested
  }
  async request(): Promise<UserState> {
    if (this.requested) {
      return this
    }

    const result = (await fetcher({
      token: this.token,
      operationName: 'getMe',
      variables: {},
    })) as GetMe
    this.personas = result.me?.personas?.map(
      (v: { id: string; name: string; iconUrl: string; screenName: string }) => new PersonaState(v)
    )
    this.requested = true
    return this
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
  id: string
  screenName: string
  constructor(data: { id: string; name: string; screenName: string; iconUrl?: string }) {
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
  new PersonaState({ id: '', name: '', screenName: '' })
)

export const getUser: () => UserState = () =>
  new UserState(getCookies().get('gqltoken') ?? 'INVALID_TOKEN', [], 0)

export interface Notification<T = unknown> {
  channel: string
  eventName: string
  data: T
}

export interface TypingStateNotification
  extends Notification<{
    createdAt: string
    authorPersonaId: string
    authorPersonaScreenName: string
  }> {
  eventName: 'typing'
}
