import type { Persona } from '@/domain/models/persona/Persona'
import type { NotificationType } from '@/domain/models/notification/NotificationType'

export type NotificationState = {
  sender: Persona | undefined
  recepient: Persona
  type: NotificationType
  message: string | undefined
  createdAt: Date
}
