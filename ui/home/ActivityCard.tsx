import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { PostState } from '../../states/PostState'

import { Author } from '../common/Author'
import { CardTitle } from '../common/CardTitle'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from '../thread/CommentInput'
import { fetcher } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import { Thread } from '../thread/Thread'
import Link from 'next/link'

interface ActivityCardProps {
  post: PostState
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useContext(UserStateContext)
  const document = `
  mutation CreateThread($title: String!, $content: String!, $post_id: Int!, $persona_id: Int!, $board_id: Int!) {
    createThread(
      title: $title
      content: $content
      contentType: TEXT
      personaId: $persona_id
      boardId: $board_id
      postId: $post_id) {
      id
    }
  }
  `
  const onSubmit: (comment: string) => void = (comment: string) => {
    fetcher(
      document,
      {
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        post_id: post.id,
        board_id: post.boardId,
      },
      userState.token
    )
    setCommentVisibility(false)
  }
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white mb-5 opacity-95 text-gray-700">
      <CardTitle title={post.title} />
      <Author name={post.author.name} iconUrl={post.author.iconUrl} /> {/* TODO: replace iconUrl */}
      <CardContent content={post.content} />
      <CardMeta>
        <CardIcons
          commentNumber={post.responseNumber}
          upvote={post.upvote}
          downvote={post.downvote}
          replyCallback={() => {
            setCommentVisibility(!commentVisibility)
          }}
          showTrashIcon={post.author.name === userState.currentPersona?.name}
        />
        <div className="pb-2"></div>
        {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : undefined}
        <Thread posts={post.responses}></Thread>
        <CreatedAt created={post.createdAt} />
        <Link href={`/t/${post.boardId}`}>Show board</Link>
      </CardMeta>
    </div>
  )
})
