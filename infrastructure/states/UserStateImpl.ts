import { makeAutoObservable } from 'mobx'
import type { Channel } from 'pusher-js/with-encryption'
import type { Notification } from '@/domain/models/notification/Notification'
import type { NotificationChannel } from '@/domain/models/notification/NotificationChannel'
import type { NotificationEventName } from '@/domain/models/notification/NotificationEventName'
import type { UserState } from '@/application/states/UserState'
import type { Persona } from '@/domain/models/persona/Persona'

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

  set personas(personas: Persona[] | undefined) {
    this._personas = personas ?? []
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

  set notifications(notifications: Notification[]) {
    this._notifications = notifications
  }

  get notifications(): Notification[] {
    return this._notifications
  }
}
