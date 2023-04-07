import type { Persona } from '@/src/domain/models/persona/Persona'
import type { NotificationType } from '@/src/domain/models/notification/NotificationType'

export type NotificationState = Readonly<{
  sender: Persona | undefined
  recepient: Persona | undefined
  type: NotificationType
  message: string | undefined
  createdAt: Date
}>
