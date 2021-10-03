import React from 'react'

import { UserIcon } from '../common/UserIcon'

export interface ThreadProps {
  title: string
  content: string
  author: string
}

export const Thread: React.FC<ThreadProps> = (props) => {
  return (
    <div className="bg-white filter drop-shadow p-4">
      <div className="text-2xl">{props.title}</div>
      <div>
        <UserIcon size="small" />
        {props.author}
      </div>
      <div>{props.content}</div>
    </div>
  )
}
