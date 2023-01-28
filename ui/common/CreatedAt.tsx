import React from 'react'
import { formatDistanceToNow, isValid } from 'date-fns'

export const CreatedAt: React.FC<{ createdAt: Date }> = ({ createdAt }) => {
  const validDate = isValid(createdAt) ? createdAt : new Date()
  return (
    <div className="text-xs text-high dark:text-high-dark opacity-50">
      Created at {formatDistanceToNow(validDate, { addSuffix: true })}
    </div>
  )
}
