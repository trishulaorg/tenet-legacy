import React from 'react'
import { AnnotationIcon, ShareIcon, ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid'

export const ActivityCardIcons: React.FC<{
  commentNumber: number
  upvote: number
  downvote: number
}> = (props) => {
  const icons = [
    { name: AnnotationIcon, text: `${props.commentNumber} Comment` },
    { name: ShareIcon, text: 'Share' },
    { name: ThumbUpIcon, text: `${props.upvote}` },
    { name: ThumbDownIcon, text: `${props.downvote}` },
  ]
  return (
    <div className="flex">
      {icons.map((icon, index) => {
        const style =
          index === 0 ? 'flex items-center opacity-50' : 'flex items-center opacity-50 pl-4'
        return (
          <div className={style} key={`icon-${index}`}>
            <icon.name className="h-5 w-5" />
            <p className="pl-1">{icon.text}</p>
          </div>
        )
      })}
    </div>
  )
}
