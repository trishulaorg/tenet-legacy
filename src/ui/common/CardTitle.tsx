import React from 'react'

export interface CardTitleProps {
  title: string
}

export const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
  return <h2 className="text-3xl pb-2 text-med dark:text-med-dark">{title}</h2>
}
