import React, { useContext, useState } from 'react'
import { UserStateContext } from '../../states/UserState'

export const CommentInput: React.FC<{ onSubmit: (comment: string) => void }> = (props) => {
  const [comment, setComment] = useState('')
  const userState = useContext(UserStateContext)

  return userState.isValidUser ? (
    <div>
      <p className="pb-2">Comments as {userState.currentPersona?.name ?? 'an unauthorized user'}</p>
      <textarea
        className="w-full leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
        placeholder="What did you think?"
      />
      <div className="bg-black bg-opacity-10  px-4 py-2 rounded-b-lg flex justify-end">
        <button
          className="bg-gray-600 text-white rounded-lg px-4 py-2 w-min"
          onClick={() => props.onSubmit(comment)}
        >
          Comment
        </button>
      </div>
    </div>
  ) : null
}
