import React from 'react'

export type TitleProps = {
  value: string
}

export const Title: React.FC<TitleProps> = (props) => {
  return <h1 className="flex-1 text-3xl text-gray-50 my-auto">{props.value}</h1>
}
