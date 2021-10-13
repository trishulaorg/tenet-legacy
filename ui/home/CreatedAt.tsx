import React from 'react'

export const CreatedAt: React.FC<{ created: string }> = ({ created }) => {
  return <div className="text-xs opacity-50">Created At {created}</div>
}
