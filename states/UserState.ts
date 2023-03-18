import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import { makeAutoObservable } from 'mobx'
import type { Channel } from 'pusher-js/with-encryption'
import { createContext, useContext } from 'react'

export class UserState {
  _personas: PersonaState[]
  currentPersonaIndex: number
  _notifications: Notification[]

  constructor(personas: PersonaState[], currentPersonaIndex = 0) {
    this._personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    this._notifications = []
    makeAutoObservable(this)
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
  name: PersonaName
  iconUrl: PersonaIconUrl
  id: PersonaId
  screenName: PersonaScreenName
  constructor(data: {
    id: PersonaId
    name: PersonaName
    screenName: PersonaScreenName
    iconUrl?: PersonaIconUrl
  }) {
    this.name = data.name
    this.screenName = data.screenName
    this.iconUrl = data.iconUrl ?? ('' as PersonaIconUrl)
    this.id = data.id
    makeAutoObservable(this)
  }
  updateName(name: PersonaName): void {
    this.name = name
  }
  updateScreenName(name: PersonaScreenName): void {
    this.screenName = name
  }
}

export const UserStateContext = createContext<UserState | null>(new UserState([]))
export const PersonaStateContext = createContext(
  new PersonaState({
    id: '' as PersonaId,
    name: '' as PersonaName,
    screenName: '' as PersonaScreenName,
  })
)

export function useUserState(): UserState | null {
  return useContext(UserStateContext)
}

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
