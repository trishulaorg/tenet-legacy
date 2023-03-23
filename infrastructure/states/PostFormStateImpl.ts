import type { PostFormState } from '@/application/states/PostFormState'
import type { Board } from '@/domain/models/board/Board'
import type { Post } from '@/domain/models/post/Post'
import { makeAutoObservable } from 'mobx'

export class PostFormStateImpl implements PostFormState {
  private _replyTo: Post | null
  private _onSubmit: (comment: string, files: File[]) => void
  private _onChange: () => void
  private _boardState: Board | null

  constructor(args: {
    replyTo?: Post
    onSubmit?: (comment: string, files: File[]) => void
    onChange?: () => void
    boardState?: Board
  }) {
    this._replyTo = args.replyTo ?? null
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
    this._boardState = args.boardState ?? null
    makeAutoObservable(this)
  }

  get onChange(): () => void {
    return this._onChange
  }

  set onChange(cb: () => void) {
    this._onChange = cb
  }

  get boardState(): Board | null {
    return this._boardState
  }

  set boardState(state: Board | null) {
    this._boardState = state
  }

  get replyTo(): Post | null {
    return this._replyTo
  }

  set replyTo(value: Post | null) {
    if (this._boardState?.id !== this._replyTo?.board.id) {
      this._replyTo = null
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
