import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import type { PostState } from '../../states/PostState'

import { Thread } from '../thread/Thread'
import { CardTitle } from '../common/CardTitle'
import { AuthorAndBoardLink } from '../common/AuthorAndBoardLink'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import type { TypingStateNotification } from '../../states/UserState'
import { UserStateContext } from '../../states/UserState'
import { mutate } from 'swr'
import { BoardStateContext } from '../../states/PostState'
import { PostFormStateContext } from '../../states/PostFormState'
import { usePublishWritingStatus } from '../board/PublishWritingStatus'
import { TypingMemberListLabel } from '../common/TypingMemberListLabel'
import { parseISO, differenceInSeconds } from 'date-fns'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetcher } from '../../libs/getClient'
import { getGqlToken } from '../../libs/cookies'

export interface PostProps {
  post: PostState
  showThreads: boolean
}

export const Post: React.FC<PostProps> = observer(({ post, showThreads }) => {
  const boardState = useContext(BoardStateContext)
  const userState = useContext(UserStateContext)
  const postForm = useContext(PostFormStateContext)
  const publishWritingStatus = usePublishWritingStatus()

  const [debouncedMembers] = useDebounce(
    [
      ...new Set(
        (userState.notifications as TypingStateNotification[])
          .filter(
            (v) =>
              v.channel === post.id &&
              v.eventName === 'typing' &&
              v.data.authorPersonaId !== userState.currentPersona?.id &&
              differenceInSeconds(new Date(), parseISO(v.data.createdAt)) < 4
          )
          .map((v) => v.data.authorPersonaScreenName)
      ),
    ],
    1000
  )

  const { route } = useRouter()
  const isInPostPage = route.startsWith('/post/')

  const onSubmit: (comment: string, files: File[]) => void = async (comment, files) => {
    const {
      createThread: { id },
    } = await fetcher({
      operationName: 'createThread',
      variables: {
        content: comment,
        personaId: userState.currentPersona?.id ?? -1,
        postId: post.id,
        boardId: post.boardId,
      },
      token: getGqlToken() ?? 'INVALID_TOKEN',
    })

    await fetcher({
      token: getGqlToken(),
      operationName: 'putAttachedImage',
      variables: { postId: id, files: files },
    })
    await mutate(post.id)
  }

  const onPostDelete = async (): Promise<void> => {
    if (prompt('Type "delete" if you really want to delete:') === 'delete') {
      await fetcher({
        operationName: 'deletePost',
        variables: { postId: post.id, personaId: userState.currentPersona?.id || 0 },
      })
      await mutate(post.id)
      await mutate(post.boardId)
    }
  }

  const variants = {
    hidden: { y: 20, opacity: 0, borderRadius: 100 },
    visible: { y: 0, opacity: 0.85, borderRadius: 10 },
  }

  const content = (
    <div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="break-words drop-shadow-lg rounded-lg p-4 bg-contentbg dark:bg-contentbg-dark transition-colors duration-350"
        layout
      >
        <CardTitle title={post.title} />
        {isInPostPage ? (
          <AuthorAndBoardLink
            screenName={post.author.screenName}
            name={post.author.name}
            iconUrl={post.author.iconUrl}
            boardLink={{
              boardId: post.boardId ?? '',
              boardName: post.parent?.title ?? boardState.title ?? '',
            }}
          />
        ) : (
          <AuthorAndBoardLink
            screenName={post.author.screenName}
            name={post.author.name}
            iconUrl={post.author.iconUrl}
          />
        )}
        <CardContent content={post.content} imageUrls={post.imageUrls} />
        <CardMeta>
          {post.privilege.deleteSelf ? (
            <CardIcons
              showCommentIcon={isInPostPage}
              commentNumber={post.responseNumber}
              upvote={post.upvote}
              downvote={post.downvote}
              replyCallback={() => {
                postForm.replyTo = post
                postForm.onSubmit = onSubmit
                postForm.boardState = boardState
                postForm.onChange = () => publishWritingStatus(post.id)
              }}
              deleteCallback={onPostDelete}
            />
          ) : (
            <CardIcons
              showCommentIcon={isInPostPage}
              commentNumber={post.responseNumber}
              upvote={post.upvote}
              downvote={post.downvote}
              replyCallback={() => {
                postForm.replyTo = post
                postForm.onSubmit = onSubmit
                postForm.onChange = () => publishWritingStatus(post.id)
              }}
            />
          )}

          <div className="pb-2" />
          <CreatedAt created={post.createdAt} />
          <TypingMemberListLabel members={debouncedMembers} />
        </CardMeta>
        <div className="pb-5" />
      </motion.div>
      {showThreads &&
        (post.hasRepsponse ? (
          <Thread threads={post.responses} parent={post} />
        ) : (
          <div>No Comments Yet</div>
        ))}
    </div>
  )

  return showThreads ? content : <Link href={'/post/' + post.id}>{content}</Link>
})
