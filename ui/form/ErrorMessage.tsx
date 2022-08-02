import React from 'react'

interface ErrorMessageProps {
  errorMessage: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => (
  <div className={'text-red-500 font-bold'}>{errorMessage}</div>
)

export { ErrorMessage }
export type { ErrorMessageProps }
