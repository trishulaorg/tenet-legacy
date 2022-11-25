import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import type { BoardState, PostState } from './PostState'

export class PostFormState {
  private _replyTo: PostState | undefined
  private _onSubmit: (comment: string, files: File[]) => void
  private _onChange: () => void
  private _boardState: BoardState | undefined

  constructor(args: {
    replyTo?: PostState
    onSubmit?: (comment: string, files: File[]) => void
    onChange?: () => void
    boardState?: BoardState
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
    this._boardState = args.boardState
    makeAutoObservable(this)
  }

  get onChange(): () => void {
    return this._onChange
  }

  set onChange(cb: () => void) {
    this._onChange = cb
  }

  get boardState(): BoardState | undefined {
    return this._boardState
  }

  set boardState(state: BoardState | undefined) {
    this._boardState = state
  }

  get replyTo(): PostState | undefined {
    return this._replyTo
  }

  set replyTo(value: PostState | undefined) {
    if (this._boardState?.id !== this._replyTo?.boardId) {
      this._replyTo = undefined
    }
    this._replyTo = value
  }

  get onSubmit(): (comment: string, files: File[]) => void | undefined {
    return this._onSubmit
  }

  set onSubmit(value: (comment: string, files: File[]) => void | undefined) {
    this._onSubmit = value
  }
}
export const PostFormStateContext = createContext(new PostFormState({}))
