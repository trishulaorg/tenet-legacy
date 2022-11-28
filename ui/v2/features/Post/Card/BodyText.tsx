/* eslint-disable */
import React from 'react'

type Props = {
  text: string
}

export default function BodyText(props: Props) {
  const { text } = props

  return <div className='text-med dark:text-med-dark'>
    {text}
  </div>
}
