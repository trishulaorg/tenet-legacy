import { PlusCircleIcon } from '@heroicons/react/solid'
import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import { PostFormStateContext } from '../../states/PostFormState'

export const PostFormInner: React.FC = observer(() => {
  const [content, setContent] = useState('')
  const state = useContext(PostFormStateContext)
  return (
    <div className="sticky bottom-0 shadow-2xl">
      <div
        className="w-full leading-6 border-t-2 border-black border-opacity-10 rounded-t-lg block bg-white
    "
      >
        <div className="mt-2 ml-2 p-2 border-l-2 border-gray-200">
          {state.replyTo?.content ?? 'aaaa'}
        </div>

        <textarea
          className="w-full p-4"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          placeholder="What did you think?"
        />
        <button
          className="absolute bottom-0 right-0 text-green-400"
          onClick={() => state.onSubmit(content)}
        >
          <PlusCircleIcon height="40" />
        </button>
      </div>
    </div>
  )
})
export const PostForm: React.FC = () => {
  return <PostFormInner />
}
