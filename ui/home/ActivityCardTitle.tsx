import React from 'react'

export const ActivityCardTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-3xl pb-2">{title}</h2>
}
