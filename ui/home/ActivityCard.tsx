import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import type { PostState } from '../../states/PostState'

import { Author } from '../common/Author'
import { CardTitle } from '../common/CardTitle'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from '../thread/CommentInput'
import { client, setAuthToken } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ActivityCardProps {
  post: PostState
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useContext(UserStateContext)
  const router = useRouter()
  const onSubmit: (comment: string) => void = async (comment: string) => {
    setAuthToken(userState.token)
    await client.createThread({
      content: comment,
      persona_id: userState.currentPersona?.id ?? -1,
      post_id: post.id,
      board_id: post.boardId,
    })

    setCommentVisibility(false)
  }
  return (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className="max-w-2xl rounded-lg p-4 bg-white mb-5 opacity-95 text-gray-700 cursor-pointer"
      onClick={() => router.push(`/p/${post.id}`)}
      onKeyDown={() => {
        /* noop */
      }}
    >
      <CardTitle title={post.title} />
      <Author
        screenName={post.author.screenName}
        name={post.author.name}
        iconUrl={post.author.iconUrl}
      />{' '}
      {/* TODO: replace iconUrl */}
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
        <div className="pb-2" />
        {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : undefined}
        <CreatedAt created={post.createdAt} />
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <span onClick={(e) => e.stopPropagation()}>
          <Link href={`/b/${post.boardId}`}>Show board</Link>
        </span>
      </CardMeta>
    </div>
  )
})
