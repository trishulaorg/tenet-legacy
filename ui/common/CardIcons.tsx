import React from 'react'
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
  onClick?: React.MouseEventHandler
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
}> = (props) => {
  const icons: IconListElement[] = [
    { name: ThumbUpIcon, text: `${props.upvote}`, onClick: props.upvoteCallback },
    { name: ThumbDownIcon, text: `${props.downvote}`, onClick: props.downvoteCallback },
    {
      name: AnnotationIcon,
      text: `${props.commentNumber} Comments`,
      onClick: props.replyCallback,
    },
    { name: ShareIcon, text: 'Share', onClick: props.shareCallback },
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
            <button className={iconStyle} key={`icon-${index}`} onClick={icon.onClick}>
              <icon.name className="h-5 w-5" />
              <p className={textStyle}>{icon.text}</p>
            </button>
          )
        })}
      </div>
      <div className="flex items-center opacity-50 pr-5 hover:text-rose-800">
        <TrashIcon className="h-5 w-5" />
        <p className="pl-1">remove</p>
      </div>
    </div>
  )
}

CardIcons.defaultProps = {
  isPost: true,
}
