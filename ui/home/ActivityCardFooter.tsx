import React from 'react'
import { AnnotationIcon, ShareIcon, ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid'

export const ActivityCardFooter: React.FC = () => {
  const icons = [
    { name: AnnotationIcon, text: '1k Comment' },
    { name: ShareIcon, text: 'Share' },
    { name: ThumbUpIcon, text: '750' },
    { name: ThumbDownIcon, text: '30' },
  ]
  return (
    <div className="flex">
      {icons.map((icon, index) => (
        <div className="flex items-center opacity-50 pl-4" key={`icon-${index}`}>
          <icon.name className="h-5 w-5" />
          <p className="pl-1">{icon.text}</p>
        </div>
      ))}
    </div>
  )
}
