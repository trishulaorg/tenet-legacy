import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { AuthorAndBoardLink } from '@/src/ui/common/AuthorAndBoardLink'
import { CardTitle } from '../common/CardTitle'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from '../thread/CommentInput'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useApiClient } from '../../states/ApiClientState'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import { useUserState } from '@/src/states/UserState'
import type { Post } from '@/src/domain/models/post/Post'

interface ActivityCardProps {
  post: Post
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useUserState()
  const apiClient = useApiClient()
  const onSubmit: (comment: string) => void = async (comment: string) => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    await apiClient.createThread({
      content: comment as ThreadContent,
      personaId: userState.currentPersona.id,
      postId: post.id,
      boardId: post.board.id,
    })
    setCommentVisibility(false)
  }

  const variants = {
    hidden: { y: 20, opacity: 0, borderRadius: 100 },
    visible: { y: 0, opacity: 0.85, borderRadius: 10 },
  }
  const content = (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      className="break-words drop-shadow-lg max-w-2xl p-4 bg-contentbg dark:bg-contentbg-dark mb-5 text-med dark:text-med-dark transition-colors duration-350 cursor-pointer"
    >
      <CardTitle title={post.title} />
      <AuthorAndBoardLink
        screenName={post.author.screenName}
        name={post.author.name}
        iconUrl={post.author.iconUrl}
      />
      {/* TODO: replace iconUrl */}
      <CardContent content={post.content} />
      <CardMeta>
        <CardIcons
          showCommentIcon={false}
          numberOfComment={post.threads.length}
          upvote={post.upvote}
          downvote={post.downvote}
          replyCallback={() => {
            setCommentVisibility(!commentVisibility)
          }}
        />
        <div className="pb-2" />
        {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : null}
        <CreatedAt createdAt={new Date(post.createdAt)} />
        <Link href={`/board/${post.board.id}`} legacyBehavior>
          <div>Show board</div>
        </Link>
      </CardMeta>
    </motion.div>
  )
  return <Link href={`/post/${post.id}`}>{content}</Link>
})
