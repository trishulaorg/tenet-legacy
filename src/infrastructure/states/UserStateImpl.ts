import { makeAutoObservable } from 'mobx'
import type { Channel } from 'pusher-js/with-encryption'
import type { Notification } from '@/src/domain/models/notification/Notification'
import type { NotificationChannel } from '@/src/domain/models/notification/NotificationChannel'
import type { NotificationEventName } from '@/src/domain/models/notification/NotificationEventName'
import type { UserState } from '@/src/application/states/UserState'
import type { Persona } from '@/src/domain/models/persona/Persona'

export class UserStateImpl implements UserState {
  _personas: Persona[]
  currentPersonaIndex: number
  _notifications: Notification[]

  constructor(personas: Persona[], currentPersonaIndex = 0) {
    this._personas = personas
    this.currentPersonaIndex = currentPersonaIndex
    this._notifications = []
    makeAutoObservable(this)
  }

  setPersonas(personas: Persona[]): void {
    this._personas = personas ?? []
  }

  subscribeNotifications<T = Record<string, string>>(
    channel: Channel,
    eventName: string,
    cb: (notification: Notification<T>) => void
  ): void {
    channel.bind(eventName, (data: T): void => {
      const n: Notification<T> = {
        channel: channel.name as NotificationChannel,
        eventName: eventName as NotificationEventName,
        data,
      }
      this.notifications.push(n)
      cb(n)
    })
  }

  setCurrentPersonaIndex(index: number): void {
    this.currentPersonaIndex = index
  }

  setNotifications(notifications: Notification[]): void {
    this._notifications = notifications
  }

  get personas(): Persona[] {
    return this._personas
  }

  get currentPersona(): Persona | undefined {
    if (this.personas.length === 0) {
      return
    }
    return this.personas[this.currentPersonaIndex]
  }

  get notifications(): Notification[] {
    return this._notifications
  }
}
