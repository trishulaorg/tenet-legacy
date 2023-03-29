// Generate <NotificationCard /> component
// which has 4 props: sender, recepient, message, type (like, comment, follow, unfollow)

// Path: ui/notification/NotificationCard.tsx
import type { Persona } from '@/domain/models/persona/Persona'
import { HeartIcon, ReplyIcon, UserAddIcon } from '@heroicons/react/solid'
import React from 'react'

export interface NotificationCardProps {
  sender?: Persona | undefined
  recepient: Persona | undefined
  message?: string | undefined
  type: 'like' | 'comment' | 'follow'
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  sender,
  recepient,
  message,
  type,
}) => {
  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-700 p-4 rounded-md bg-contentbg dark:bg-contentbg-dark w-full">
      <div className="flex items-center">
        {type === 'like' ? (
          <HeartIcon className="w-6 h-6 text-red-500" />
        ) : type === 'comment' ? (
          <ReplyIcon className="w-6 h-6 text-blue-500" />
        ) : (
          <UserAddIcon className="w-6 h-6 text-blue-500" />
        )}

        <div className="ml-4">
          <p className="text-lg font-semibold text-med dark:text-med-dark">
            From {sender?.screenName ? sender?.screenName : 'Coton'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {recepient?.screenName ? recepient?.screenName : ''}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-med dark:text-med-dark">{message}</p>
      </div>
    </div>
  )
}
