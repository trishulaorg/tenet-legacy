import React, { Fragment } from 'react'
import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from '@heroicons/react/solid'

interface IconListElement {
  name: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  text: string
  value?: number
  onClick: React.MouseEventHandler | undefined
  isVisible: boolean
}

export const CardIcons: React.FC<{
  commentNumber: number
  upvote: number
  downvote: number
  isPost?: boolean
  upvoteCallback?: () => void
  downvoteCallback?: () => void
  replyCallback?: () => void
  shareCallback?: () => void
  showTrashIcon?: boolean
  showCommentNumber?: boolean
}> = (props) => {
  const showCommentNumber = props.showCommentNumber !== false
  const icons: IconListElement[] = [
    {
      name: ThumbUpIcon,
      text: `${props.upvote}`,
      value: props.upvote,
      onClick: props.upvoteCallback,
      isVisible: true,
    },
    {
      name: ThumbDownIcon,
      text: `${props.downvote}`,
      value: props.downvote,
      onClick: props.downvoteCallback,
      isVisible: true,
    },
    {
      name: AnnotationIcon,
      text: `${props.commentNumber}`,
      value: props.commentNumber,
      onClick: props.replyCallback,
      isVisible: showCommentNumber,
    },
    { name: ShareIcon, text: '', onClick: props.shareCallback, isVisible: true },
  ]
  return (
    <div className="flex justify-between">
      <div className="flex justify-start">
        {icons.map((icon, index) => {
          const iconStyle =
            index === 0
              ? 'flex items-center opacity-50 hover:text-rose-800'
              : 'flex items-center opacity-50 pl-4 hover:text-rose-800'
          const textStyle = index < 2 ? 'pl-1' : 'pl-1 hidden md:block'
          return (
            <Fragment key={index}>
              {icon.isVisible ? (
                <button className={iconStyle} key={`icon-${index}`} onClick={icon.onClick}>
                  <icon.name className="h-5 w-5" />
                  {icon.value === undefined || icon.value > 0 ? (
                    <p className={textStyle}>{icon.text}</p>
                  ) : null}
                </button>
              ) : null}
            </Fragment>
          )
        })}
      </div>
      <div className="flex items-center opacity-50 pr-5 hover:text-rose-800">
        {props.showTrashIcon ? <TrashIcon className="h-5 w-5" /> : null}
      </div>
    </div>
  )
}

CardIcons.defaultProps = {
  isPost: true,
}
