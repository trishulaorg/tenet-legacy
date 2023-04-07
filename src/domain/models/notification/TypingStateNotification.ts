import type { DateString } from '@/src/domain/models/common/DateString'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Notification } from './Notification'

export type TypingStateNotification = Notification<{
  createdAt: DateString
  authorPersonaId: PersonaId
  authorPersonaScreenName: PersonaScreenName
}> & {
  eventName: 'typing'
}
