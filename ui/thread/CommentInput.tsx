import React from 'react'

export const CommentInput: React.FC = () => {
  return (
    <div>
      <p className="pb-2">Comments as userName</p>
      <textarea
        className="w-full leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block"
        rows={4}
        placeholder="What did you think?"
      />
      <div className="bg-black bg-opacity-10  px-4 py-2 rounded-b-lg flex justify-end">
        <a href="#">
          <div className="bg-gray-600 text-white rounded-lg px-4 py-2 w-min">Comment</div>
        </a>
      </div>
    </div>
  )
}
