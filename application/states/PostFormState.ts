import type { Board } from '@/domain/models/board/Board'
import type { Post } from '@/domain/models/post/Post'
import type { Thread } from '@/domain/models/thread/Thread'

export type PostFormState = {
  onChange: () => void
  boardState: Board | null
  replyTo: Post | Thread | null
  onSubmit: (comment: string, files: File[]) => void | undefined
}
