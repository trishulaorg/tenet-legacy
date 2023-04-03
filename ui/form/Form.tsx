import classNames from 'classnames'
import type { SyntheticEvent } from 'react'

export const Form: React.FC<{
  className?: string
  onSubmit: () => void
}> = (props) => {
  const { className, onSubmit, children } = props
  function handleSubmit(e: SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault()
    onSubmit()
  }
  return (
    <form
      className={classNames(
        className,
        'flex flex-col w-full items-center justify-center space-y-5'
      )}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}
