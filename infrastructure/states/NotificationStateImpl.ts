import type { NotificationState } from '@/application/states/NotificationState'
import type { NotificationData } from '@/domain/models/notification/NotificationData'
import type { NotificationType } from '@/domain/models/notification/NotificationType'
import type { Persona } from '@/domain/models/persona/Persona'
import { makeAutoObservable } from 'mobx'

export class NotificationStateImpl implements NotificationState {
  private _type: NotificationType
  private _message?: string | undefined
  private _createdAt: Date
  sender: Persona | undefined
  recepient!: Persona

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

  set type(value: NotificationType) {
    this._type = value
  }

  get message(): string | undefined {
    return this._message
  }

  set message(value: string | undefined) {
    this._message = value
  }

  get createdAt(): Date {
    return this._createdAt
  }

  set createdAt(value: Date) {
    this._createdAt = value
  }
}
