/* eslint-disable */
import React from 'react'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  createdAt: Date
}

export default function Timestamp(props: Props) {
  const { createdAt } = props
  
  return <div className='text-xs text-high dark:text-high-dark opacity-50'>
    {formatDistanceToNow(createdAt, { addSuffix: true })}
  </div>
}
