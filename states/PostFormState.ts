import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import type { PostState } from './PostState'

export class PostFormState {
  private _replyTo: PostState | undefined
  private _onSubmit: (comment: string, files: File[]) => void
  private _onChange: () => void

  constructor(args: {
    replyTo?: PostState
    onSubmit?: (comment: string, files: File[]) => void
    onChange?: () => void
  }) {
    this._replyTo = args.replyTo
    this._onSubmit =
      args.onSubmit ??
      (() => {
        /* no-op */
      })
    this._onChange =
      args.onChange ??
      (() => {
        /* no-op */
      })
    makeAutoObservable(this)
  }

  get onChange(): () => void {
    return this._onChange
  }

  set onChange(cb: () => void) {
    this._onChange = cb
  }

  get replyTo(): PostState | undefined {
    return this._replyTo
  }

  set replyTo(value: PostState | undefined) {
    this._replyTo = value
  }

  get onSubmit(): (comment: string, files: File[]) => void | undefined {
    return this._onSubmit
  }

  set onSubmit(value: (comment: string, files: File[]) => void | undefined) {
    this._onSubmit = value
  }
  set type(value: PostState) {
    this._replyTo = value
  }
}
export const PostFormStateContext = createContext(new PostFormState({}))
