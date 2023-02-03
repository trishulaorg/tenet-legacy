import type { MouseEventHandler } from 'react'

export type ButtonSize = 'small' | 'big' | 'normal'

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  label: string
  size: ButtonSize
}

export const Button: React.FC<ButtonProps> = ({ label, size, onClick }) => {
  let className =
    'mb-4 md:px-4 ml-2 lg:px-6 block text-med dark:text-med-dark dark:hover:text-high-dark hover:text-high border-primary dark:border-primary-dark border-opacity-40 hover:border-opacity-100 rounded-xl border border-double border-4 transition-colors'
  if (size === 'small') {
    className += ' px-2 text-sm'
  } else if (size === 'normal') {
    className += ' px-4 py-2 text-base'
  } else if (size === 'big') {
    className += ' px-8 py-6 w-3/12 text-xl'
  }
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  )
}
