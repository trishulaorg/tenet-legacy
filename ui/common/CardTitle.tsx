import React from 'react'

export const CardTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-3xl pb-2 text-med dark:text-med-dark">{title}</h2>
}
