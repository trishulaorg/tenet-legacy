import type { NotificationState } from '@/src/application/states/NotificationState'
import type { NotificationData } from '@/src/domain/models/notification/NotificationData'
import type { NotificationType } from '@/src/domain/models/notification/NotificationType'
import type { Persona } from '@/src/domain/models/persona/Persona'
import { makeAutoObservable } from 'mobx'

export class NotificationStateImpl implements NotificationState {
  private _type: NotificationType
  private _message?: string | undefined
  private _createdAt: Date
  sender: Persona | undefined
  recepient: Persona | undefined

  constructor(data: NotificationData) {
    this._type = data.type
    this._createdAt = data.createdAt
    if (data.message != null) {
      this._message = data.message
    }
    makeAutoObservable(this)
  }

  get type(): NotificationType {
    return this._type
  }

  get message(): string | undefined {
    return this._message
  }

  get createdAt(): Date {
    return this._createdAt
  }
}
