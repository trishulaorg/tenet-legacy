import type { Persona } from '@/domain/models/persona/Persona'
import type { NotificationType } from '@/domain/models/notification/NotificationType'

export type NotificationState = Readonly<{
  sender: Persona | undefined
  recepient: Persona | undefined
  type: NotificationType
  message: string | undefined
  createdAt: Date
}>
