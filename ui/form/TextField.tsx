import classNames from 'classnames'
import type { HTMLInputTypeAttribute, SyntheticEvent } from 'react'

type Props = {
  className?: string
  type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password'>
  label: string
  value: string
  errorMessage?: string | undefined
  onChange: (value: string) => void
}

export const TextField: React.FC<Props> = (props) => {
  const { className, type, label, value, errorMessage, onChange } = props
  function handleChange(e: SyntheticEvent<HTMLInputElement>): void {
    onChange(e.currentTarget.value)
  }
  return (
    <label className={classNames(className, 'block w-full flex flex-col')}>
      <span className="block text-sm text-gray-900 dark:text-white mb-1">{label}</span>
      <input
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        type={type}
        value={value}
        onChange={handleChange}
      />
      {errorMessage != null && <span className="text-red-500 text-sm mt-1">{errorMessage}</span>}
    </label>
  )
}
