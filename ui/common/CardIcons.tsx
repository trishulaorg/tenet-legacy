import React from 'react'
import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from '@heroicons/react/solid'

export const CardIcons: React.FC<{
  commentNumber: number
  upvote: number
  downvote: number
  isPost?: boolean
}> = (props) => {
  const icons = [
    { name: ThumbUpIcon, text: `${props.upvote}` },
    { name: ThumbDownIcon, text: `${props.downvote}` },
    { name: AnnotationIcon, text: props.isPost ? `${props.commentNumber} Comment` : 'reply' },
    { name: ShareIcon, text: 'Share' },
  ]
  return (
    <div className="flex justify-between">
      <div className="flex justify-start">
        {icons.map((icon, index) => {
          let style
          if (index === 0) {
            style = 'flex items-center opacity-50'
          } else if (index === 1) {
            style = 'flex items-center opacity-50 pl-4'
          } else {
            style = 'flex items-center opacity-50 pl-4 hidden md:flex'
          }
          return (
            <div className={style} key={`icon-${index}`}>
              <icon.name className="h-5 w-5" />
              <p className="pl-1">{icon.text}</p>
            </div>
          )
        })}
      </div>
      <div className="flex items-center opacity-50 pr-5">
        <TrashIcon className="h-5 w-5" />
        <p className="pl-1">remove</p>
      </div>
    </div>
  )
}

CardIcons.defaultProps = {
  isPost: true,
}
