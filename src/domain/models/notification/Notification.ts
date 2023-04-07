import type { NotificationChannel } from './NotificationChannel'
import type { NotificationEventName } from './NotificationEventName'

export interface Notification<T = unknown> {
  channel: NotificationChannel
  eventName: NotificationEventName
  data: T
}
