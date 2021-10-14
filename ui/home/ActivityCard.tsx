import React from 'react'
import { observer } from 'mobx-react'
import { Author } from './Author'
import { ActivityCardTitle } from './ActivityCardTitle'
import { ActivityCardContent } from './ActivityCardContent'
import { ActivityCardIcons } from './ActivityCardIcons'
import { ActivityCardMeta } from './ActivityCardMeta'
import { CreatedAt } from './CreatedAt'
import { PostState } from '../../states/PostState'

interface ActivityCardProps {
  post: PostState
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white">
      <ActivityCardTitle title={post.title} />
      <Author name={post.author.name} iconUrl={post.author.iconUrl} /> {/* TODO: replace iconUrl */}
      <ActivityCardContent content={post.content} />
      <ActivityCardMeta>
        <ActivityCardIcons
          commentNumber={post.responseNumber}
          upvote={post.upvote}
          downvote={post.downvote}
        />
        <div className="pb-2"></div>
        <CreatedAt created={post.createdAt} />
      </ActivityCardMeta>
    </div>
  )
})
