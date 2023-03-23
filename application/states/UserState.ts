import type { Notification } from '@/domain/models/notification/Notification'
import type { Persona } from '@/domain/models/persona/Persona'
import type { Channel } from 'pusher-js/with-encryption'

export type UserState = {
  currentPersonaIndex: number
  personas: Persona[]
  currentPersona: Persona | undefined
  notifications: Notification[]
  subscribeNotifications<T = Record<string, string>>(
    channel: Channel,
    eventName: string,
    cb: (notification: Notification<T>) => void
  ): void
}
