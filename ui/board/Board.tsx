import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React, { useContext, useState } from 'react'
import { fetcher } from '../../libs/fetchAPI'
import { BoardStateContext } from '../../states/PostState'
import { UserStateContext } from '../../states/UserState'
import { Post } from '../thread/Post'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { ulid } from 'ulid'
import { PostForm } from '../common/PostForm'

interface BoardProps {
  showPostCreate?: boolean
}

export const Board: React.FC<BoardProps> = observer(({ showPostCreate = true }) => {
  const state = useContext(BoardStateContext)
  const user = useContext(UserStateContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const onClick: FormEventHandler = async (e) => {
    e.preventDefault()

    await fetcher(
      queryDocuments.Mutation.createPost,
      {
        id: ulid(),
        title,
        content,
        persona_id: user.currentPersona?.id ?? -1,
        board_id: state.id,
      },
      user.token
    )
    await mutate(state.fetcherDocument)
  }

  return (
    <div>
      <h1 className="my-4 text-slate-600 text-2xl">#{state.title}</h1>
      <div>
        {showPostCreate === true && user.isValidUser ? (
          <form className="py-4">
            <h2 className="my-2 text-slate-600 text-1xl">Create New Post</h2>
            <label>
              <div>Title</div>
              <input
                type="text"
                placeholder="post title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                className="w-full leading-6 p-1 border-2 border-black border-opacity-10 rounded-t-lg block"
              />
            </label>
            <label>
              <div>Content</div>
              <textarea
                className="w-full leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                placeholder="What did you think?"
              />
            </label>
            <button className="bg-gray-600 text-white rounded-lg px-4 py-2 w-min" onClick={onClick}>
              Comment
            </button>
          </form>
        ) : null}
      </div>
      <ul>
        {state.posts.map((p, idx) => (
          <li key={idx} className="mb-5">
            <Post post={p} />
          </li>
        ))}
      </ul>
      <PostForm />
    </div>
  )
})
