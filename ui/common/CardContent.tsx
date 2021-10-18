import React from 'react'

export const CardContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="px-8 pb-8">
      <p>{content}</p>
    </div>
  )
}
