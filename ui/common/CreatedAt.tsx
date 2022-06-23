import React from 'react'
import { formatDistanceToNow, isValid, parseISO } from 'date-fns'

export const CreatedAt: React.FC<{ created: string }> = ({ created }) => {
  const createdAt = parseISO(created)
  const validDate = isValid(createdAt) ? createdAt : new Date()
  return (
    <div className="text-xs opacity-50">
      Created at {formatDistanceToNow(validDate, { addSuffix: true })}
    </div>
  )
}
