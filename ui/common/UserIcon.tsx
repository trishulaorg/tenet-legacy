import React from 'react'
import { UserIcon as HUserIcon } from '@heroicons/react/solid'

export interface UserIconProps {
  size: 'small' | 'medium' | 'large'
  src?: string
}

const map = new Map<string, string>([
  ['small', '20px'],
  ['medium', '120px'],
  ['large', '200px'],
])

export const UserIcon: React.FC<UserIconProps> = ({ size, src }) => {
  return !src ? (
    <HUserIcon width={map.get(size)} height={map.get(size)} />
  ) : (
    <img
      src={src}
      alt="avater"
      width={map.get(size)}
      height={map.get(size)}
      style={{
        clipPath: 'circle(40%)',
        objectFit: 'cover',
        width: map.get(size),
        height: map.get(size),
        objectPosition: '100% 0',
      }}
    />
  )
}
