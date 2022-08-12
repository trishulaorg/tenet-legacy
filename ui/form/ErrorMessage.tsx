import React from 'react'

interface ErrorMessageProps {
  errorMessage: string
  className?: string
}

const errorMessageBaseStyleClasses = 'text-red-500 font-bold'

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage, className }) => (
  <div
    className={
      className ? `${errorMessageBaseStyleClasses} ${className}` : errorMessageBaseStyleClasses
    }
  >
    {errorMessage}
  </div>
)

export { ErrorMessage }
export type { ErrorMessageProps }
