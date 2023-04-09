import type { Notification } from '@/src/domain/models/notification/Notification'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { Channel } from 'pusher-js/with-encryption'

export type UserState = Readonly<{
  currentPersonaIndex: number
  personas: Persona[]
  currentPersona: Persona | undefined
  notifications: Notification[]
  subscribeNotifications<T = Record<string, string>>(
    channel: Channel,
    eventName: string,
    cb: (notification: Notification<T>) => void
  ): void
  setCurrentPersonaIndex(index: number): void
}>
