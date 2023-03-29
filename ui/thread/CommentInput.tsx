import type { PostContent } from '@/domain/models/post/PostContent'
import { useUserState } from '@/states/UserState'
import React, { useState } from 'react'
import { Button } from '../common/Button'

export const CommentInput: React.FC<{ onSubmit: (comment: PostContent) => void }> = (props) => {
  const [comment, setComment] = useState<PostContent>('' as PostContent)
  const userState = useUserState()
  return userState != null ? (
    <div className="bg-slate-100 bg-opacity-85 p-4 rounded-lg mb-20">
      <p className="pb-2 ">
        Comments as {userState.currentPersona?.name ?? 'an unauthorized user'}
      </p>
      <textarea
        className="w-full leading-6 p-4 border-2 border-black dark:border-white border-opacity-10 rounded-t-lg block"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value as PostContent)}
        placeholder="What did you think?"
      />
      <div className="bg-slate-100 bg-opacity-25 px-4 py-2 rounded-b-lg flex justify-end">
        <Button onClick={() => props.onSubmit(comment)} label="Comment" size="normal" />
      </div>
    </div>
  ) : null
}
