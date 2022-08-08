import React from 'react'

export interface UserIconProps {
  size: 'small' | 'medium'
  src?: string
}

export const UserIcon: React.FC<UserIconProps> = ({ size, src }) => {
  return !src ? (
    <div className={size === 'small' ? 'w-5 h-5 border rounded-sm inline-block' : 'w-40 h-40'} />
  ) : (
    <img
      src={src ? src : 'https://picsum.photos/20'}
      alt="avater"
      width={size ? '20px' : '160px'}
      height={size ? '20px' : '160px'}
      referrerPolicy={'no-referrer'}
    />
  )
}
