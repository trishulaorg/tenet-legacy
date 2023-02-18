import React from 'react'
import { UserIcon as HUserIcon } from '@heroicons/react/solid'

export interface UserIconProps {
  size: 'sm' | 'md' | 'lg'
  src?: string
}

export const UserIcon: React.FC<UserIconProps> = ({ size, src }) => {
  const sizes = {
    sm: {
      width: '20px',
      height: '20px',
    },
    md: {
      width: '35px',
      height: '35px',
    },
    lg: {
      width: '40px',
      height: '40px',
    },
  }

  return !src ? (
    <HUserIcon width={sizes[size].width} height={sizes[size].height} />
  ) : (
    <img
      src={src}
      alt="avater"
      width={sizes[size].width}
      height={sizes[size].height}
      className="z-20 rounded"
    />
  )
}
