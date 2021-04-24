import { makeAutoObservable } from 'mobx'

export class UserState {
  name = ''
  iconUrl = ''
  constructor() {
    makeAutoObservable(this)
  }
}
