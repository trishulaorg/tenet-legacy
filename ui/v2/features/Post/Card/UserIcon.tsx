/* eslint-disable */
import React from 'react'
import { UserIcon as HUserIcon } from '@heroicons/react/solid'

type Props = {
  src?: string
}

export default function UserIcon(props: Props) {
  const { src } = props
  /* set default img */
  if (src) {
    return (
      <div>
        <img src={src} className="max-w-full h-auto rounded-full"/>
      </div>
      )
  }
  else{
    return (
      <div>
        <HUserIcon width='20px' height='20px'/>
      </div>
      )
  }
}
