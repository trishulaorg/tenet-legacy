import React from 'react'
import { UserIcon as HUserIcon } from '@heroicons/react/solid'

export interface UserIconProps {
  size: 'small' | 'medium'
  src?: string
}

export const UserIcon: React.FC<UserIconProps> = ({ size, src }) => {

  const sizes = {
    small : {
      width: '20px',
      height: '20px'
    },
    medium: {
      width: '35px',
      height: '35px'
    }
  }

  return !src ? (
    <HUserIcon width={sizes[size].width} height={sizes[size].height} />
  ) : (
    <img src={src} alt="avater" width={sizes[size].width} height={sizes[size].height} />
  )
}
