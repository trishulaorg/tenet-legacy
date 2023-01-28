import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import type { PostState } from '../../states/PostState'

import { AuthorAndBoardLink } from '../common/AuthorAndBoardLink'
import { CardTitle } from '../common/CardTitle'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from '../thread/CommentInput'
// import { client, setAuthToken } from '../../libs/fetchAPI'
import { UserStateContext } from '../../states/UserState'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/getClient'

interface ActivityCardProps {
  post: PostState
}

export const ActivityCard: React.FC<ActivityCardProps> = observer(({ post }) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useContext(UserStateContext)
  const onSubmit: (comment: string) => void = async (comment: string) => {
    await fetcher({
      operationName: 'createThread',
      token: getGqlToken(),
      variables: {
        content: comment,
        personaId: userState.currentPersona?.id ?? -1,
        postId: post.id,
        boardId: post.boardId,
      },
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
          commentNumber={post.responseNumber}
          upvote={post.upvote}
          downvote={post.downvote}
          replyCallback={() => {
            setCommentVisibility(!commentVisibility)
          }}
        />
        <div className="pb-2" />
        {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : undefined}
        <CreatedAt createdAt={post.createdAt} />
        <Link href={`/board/${post.boardId}`} legacyBehavior>
          <div>Show board</div>
        </Link>
      </CardMeta>
    </motion.div>
  )
  return <Link href={`/post/${post.id}`}>{content}</Link>
})
