import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { PostState } from '../../states/PostState'

import { Author } from '../common/Author'
import { CardTitle } from '../common/CardTitle'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from '../thread/CommentInput'

interface ActivityCardProps {
  post: PostState
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const onSubmit: (comment: string) => void = (comment: string) => {
    console.log('string:' + comment)
  }
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white mb-5">
      <CardTitle title={post.title} />
      <Author name={post.author.name} iconUrl={post.author.iconUrl} /> {/* TODO: replace iconUrl */}
      <CardContent content={post.content} />
      <CardMeta>
        <CardIcons
          commentNumber={post.responseNumber}
          upvote={post.upvote}
          downvote={post.downvote}
          replyCallback={() => {
            setCommentVisibility(true)
          }}
        />
        <div className="pb-2"></div>
        {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : undefined}
        <CreatedAt created={post.createdAt} />
      </CardMeta>
    </div>
  )
})
