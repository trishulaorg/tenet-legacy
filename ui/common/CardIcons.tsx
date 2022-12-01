import React, { Fragment } from 'react'
import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import { observer } from 'mobx-react'

interface IconListElement {
  name: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  text: string
  value?: number
  onClick: React.MouseEventHandler | undefined
  isVisible: boolean
}

interface CardIconsProps {
  commentNumber: number
  upvote: number
  downvote: number
  upvoteCallback?: () => void
  downvoteCallback?: () => void
  replyCallback?: () => void
  shareCallback?: () => void
  deleteCallback?: () => void | Promise<void>
  showCommentIcon: boolean
}

export const CardIcons: React.FC<CardIconsProps> = observer(
  ({
    commentNumber,
    downvote,
    downvoteCallback,
    replyCallback,
    shareCallback,
    deleteCallback,
    showCommentIcon,
    upvote,
    upvoteCallback,
  }) => {
    const icons: IconListElement[] = [
      {
        name: ThumbUpIcon,
        text: `${upvote}`,
        value: upvote,
        onClick: upvoteCallback,
        isVisible: true,
      },
      {
        name: ThumbDownIcon,
        text: `${downvote}`,
        value: downvote,
        onClick: downvoteCallback,
        isVisible: true,
      },
      {
        name: AnnotationIcon,
        text: `${commentNumber}`,
        value: commentNumber,
        onClick: replyCallback,
        isVisible: showCommentIcon,
      },
      { name: ShareIcon, text: '', onClick: shareCallback, isVisible: true },
    ]

    return (
      <div
        role="presentation"
        className="flex justify-between text-med dark:text-med-dark"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      >
        <div className="flex justify-start">
          {icons.map((icon, index) => {
            const iconStyle =
              index === 0
                ? 'flex items-center opacity-50 hover:text-rose-800 dark:hover:text-rose-400 hover:transition-colors'
                : 'flex items-center opacity-50 pl-4 hover:text-rose-800 dark:hover:text-rose-400 hover:transition-colors'
            const textStyle = index < 2 ? 'pl-1' : 'pl-1 hidden md:block'
            return (
              <Fragment key={index}>
                {icon.isVisible ? (
                  <button className={iconStyle} key={`icon-${index}`} onClick={icon.onClick}>
                    <icon.name className="h-5 w-5" />
                    {icon.value === undefined || icon.value > 0 ? (
                      <div className={textStyle}>{icon.text}</div>
                    ) : null}
                  </button>
                ) : null}
              </Fragment>
            )
          })}
        </div>
        <div className="flex items-center opacity-50 pr-5 hover:text-rose-800">
          {deleteCallback ? <TrashIcon onClick={deleteCallback} className="h-5 w-5" /> : null}
        </div>
      </div>
    )
  }
)
