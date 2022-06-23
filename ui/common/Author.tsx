import React from 'react'
import { UserIcon } from './UserIcon'

export const Author: React.FC<{ name: string; screenName: string; iconUrl: string }> = ({
  name,
  screenName,
  iconUrl,
}) => {
  return (
    <div className="flex items-center font-medium">
      <UserIcon size={'small'} src={iconUrl} />
      <p className="pl-1">
        <span className="">{screenName}</span>
        <span className="text-gray-300 font-thin">@{name}</span>
      </p>
    </div>
  )
}
