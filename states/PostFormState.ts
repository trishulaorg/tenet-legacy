import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import type { PostState } from './PostState'

export class PostFormState {
  _replyTo: PostState | undefined
  _onSubmit: (comment: string) => void

  constructor(args: { replyTo?: PostState; onSubmit?: (comment: string) => void }) {
    this._replyTo = args.replyTo
    this._onSubmit =
      args.onSubmit ??
      (() => {
        /* no-op */
      })
    makeAutoObservable(this)
  }

  get replyTo(): PostState | undefined {
    return this._replyTo
  }

  set replyTo(value: PostState | undefined) {
    this._replyTo = value
  }

  get onSubmit(): (comment: string) => void | undefined {
    return this._onSubmit
  }

  set onSubmit(value: (comment: string) => void | undefined) {
    this._onSubmit = value
  }
  set type(value: PostState) {
    this._replyTo = value
  }
}
export const PostFormStateContext = createContext(new PostFormState({}))
