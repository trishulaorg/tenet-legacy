import type { PostFormState } from '@/application/states/PostFormState'
import type { Board } from '@/domain/models/board/Board'
import type { Post } from '@/domain/models/post/Post'
import type { Thread } from '@/domain/models/thread/Thread'
import { makeAutoObservable } from 'mobx'

export class PostFormStateImpl implements PostFormState {
  private _replyTo: Post | Thread | null
  private _onSubmit: (comment: string, files: File[]) => void
  private _onChange: () => void
  private _boardState: Board | null

  constructor(args?: {
    replyTo: Post
    onSubmit: (comment: string, files: File[]) => void
    onChange: () => void
    boardState: Board
  }) {
    this._replyTo = args?.replyTo ?? null
    this._onSubmit =
      args?.onSubmit ??
      (() => {
        /* no-op */
      })
    this._onChange =
      args?.onChange ??
      (() => {
        /* no-op */
      })
    this._boardState = args?.boardState ?? null
    makeAutoObservable(this)
  }

  setPostFormState(state: {
    boardState: Board
    onChange: () => void
    replyTo: Post | Thread
    onSubmit: (comment: string, files: File[]) => void
  }): void {
    this._replyTo = state.replyTo
    this._onSubmit = state.onSubmit
    this._onChange = state.onChange
    this._boardState = state.boardState
  }

  get onChange(): () => void {
    return this._onChange
  }

  get boardState(): Board | null {
    return this._boardState
  }

  get replyTo(): Post | Thread | null {
    return this._replyTo
  }

  get onSubmit(): (comment: string, files: File[]) => void | undefined {
    return this._onSubmit
  }
}
