import React from 'react'
import { formatDistanceToNow } from 'date-fns'

export const CreatedAt: React.FC<{ created: Date | number }> = ({ created }) => {
  return (
    <div className="text-xs opacity-50">
      Created at {formatDistanceToNow(created, { addSuffix: true })}
    </div>
  )
}
