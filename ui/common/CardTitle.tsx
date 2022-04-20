import React from 'react'

export const CardTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-3xl pb-2 text-gray-700">{title}</h2>
}
