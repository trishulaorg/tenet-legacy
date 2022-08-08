import React from 'react'
import { UserIcon as HUserIcon } from '@heroicons/react/solid'

export interface UserIconProps {
  size: 'small' | 'medium'
  src?: string
}

export const UserIcon: React.FC<UserIconProps> = ({ size, src }) => {
  return !src ? (
    <HUserIcon width={size ? '20px' : '160px'} height={size ? '20px' : '160px'} />
  ) : (
    <img src={src} alt="avater" width={size ? '20px' : '160px'} height={size ? '20px' : '160px'} />
  )
}
