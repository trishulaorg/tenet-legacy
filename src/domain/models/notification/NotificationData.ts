import type { Persona } from '@/src/domain/models/persona/Persona'
import type { NotificationType } from './NotificationType'

export type NotificationData = {
  type: NotificationType
  message?: string
  createdAt: Date
  sender?: Persona | undefined
}
