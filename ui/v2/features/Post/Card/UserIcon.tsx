/* eslint-disable */
import React from 'react'

type Props = {
  src: string
}

export default function UserIcon(props: Props) {
  const { src } = props

  return <div>
    <img src={src} className="max-w-full h-auto rounded-full"/>
  </div>
}