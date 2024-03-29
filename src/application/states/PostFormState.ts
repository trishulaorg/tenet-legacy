import type { Board } from '@/src/domain/models/board/Board'
import type { Post } from '@/src/domain/models/post/Post'
import type { Thread } from '@/src/domain/models/thread/Thread'

export type PostFormState = Readonly<{
  boardState: Board | null
  onChange: () => void
  replyTo: Post | Thread | null
  onSubmit: (comment: string, files: File[]) => void
  setPostFormState: (state: {
    boardState: Board
    onChange: () => void
    replyTo: Post | Thread
    onSubmit: (comment: string, files: File[]) => void
  }) => void
}>
