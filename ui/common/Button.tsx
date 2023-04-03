import classNames from 'classnames'
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export type ButtonSize = 'small' | 'big' | 'normal'

export interface ButtonProps {
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: MouseEventHandler<HTMLButtonElement>
  label: string
  size: ButtonSize
  icon?: React.ReactElement
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={classNames(props.className, {
        ['bg-primary dark:bg-primary-dark flex items-center justify-center md:px-4 lg:px-6 block text-med dark:text-med-dark dark:hover:text-high-dark hover:text-high border-primary dark:border-primary-dark border-opacity-40 hover:border-opacity-100 rounded-xl border border-double border-4 transition-colors']:
          true,
        ['px-2 text-sm']: props.size === 'small',
        ['px-4 py-2 text-base']: props.size === 'normal',
        ['px-8 py-6 w-3/12 text-xl']: props.size === 'big',
      })}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon != null && <span>{props.icon}</span>}
      <span>{props.label}</span>
    </button>
  )
}
