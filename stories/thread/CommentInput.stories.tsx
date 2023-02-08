import type { ReactElement } from 'react'
import React from 'react'
import { CommentInput } from '../../ui/thread/CommentInput'

export default {
  title: 'CommentInput',
  component: CommentInput,
}
export const Card = (): ReactElement => (
  <CommentInput
    onSubmit={function (_comment: string): void {
      throw new Error('Function not implemented.')
    }}
  />
)
