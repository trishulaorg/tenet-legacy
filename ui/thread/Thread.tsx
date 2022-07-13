import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import { PostState } from '../../states/PostState'

import { Reply } from './Reply'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { UserStateContext } from '../../states/UserState'
import { fetcher } from '../../libs/fetchAPI'
import { CommentInput } from './CommentInput'

export interface ThreadProps {
  posts: PostState[]
}

export const Thread: React.FC<ThreadProps> = observer((props) => {
  const [commentVisibility, setCommentVisibility] = useState<Set<number>>(new Set())
  const userState = useContext(UserStateContext)
  const document = `
  mutation CreateReply($title: String!, $content: String!, $persona_id: Int!, $thread_id: Int!) {
    createReply(
      title: $title
      content: $content
      contentType: TEXT
      personaId: $persona_id
      threadId: $thread_id) {
      id
    }
  }
  `
  const onSubmit: (comment: string, thread: PostState) => void = (comment, thread) => {
    fetcher(
      document,
      {
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        thread_id: thread.id,
      },
      userState.token
    )
    setCommentVisibility(new Set())
  }
  return (
    <ul className="pl-4">
      {props.posts.map((v, i) => (
        <li key={i} className="py-4">
          <Author
            screenName={v.author.screenName}
            name={v.author.name}
            iconUrl={v.author.iconUrl}
          />
          <div className="ml-2 border-gray-200	border-l-4">
            <CardContent content={v.content} isPost={false} />
            <CardMeta isPost={false}>
              <CardIcons
                commentNumber={v.responseNumber}
                upvote={v.upvote}
                downvote={v.downvote}
                isPost={false}
                replyCallback={() => {
                  setCommentVisibility(commentVisibility.has(v.id) ? new Set([]) : new Set([v.id]))
                }}
                showTrashIcon={v.author.name === userState.currentPersona?.name}
              />
              <div className="pb-2" />
              <CreatedAt created={v.createdAt} />
            </CardMeta>
            {commentVisibility.has(v.id) ? (
              <CommentInput onSubmit={(comment) => onSubmit(comment, v)} />
            ) : undefined}
            {v.hasRepsponse ? <Reply posts={v.responses} /> : undefined}
          </div>
        </li>
      ))}
    </ul>
  )
})
