import type { DateString } from '@/domain/models/common/DateString'
import type { PersonaId } from '@/domain/models/persona/PersonaId'
import type { PersonaScreenName } from '@/domain/models/persona/PersonaScreenName'
import type { Notification } from './Notification'

export type TypingStateNotification = Notification<{
  createdAt: DateString
  authorPersonaId: PersonaId
  authorPersonaScreenName: PersonaScreenName
}> & {
  eventName: 'typing'
}
