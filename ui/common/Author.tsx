import React from 'react'
import { UserIcon } from './UserIcon'

export const Author: React.FC<{ name: string; iconUrl: string }> = ({ name, iconUrl }) => {
  return (
    <div className="flex items-center pb-2">
      <UserIcon size={'small'} src={iconUrl} />
      <p className="pl-1">{name}</p>
    </div>
  )
}
