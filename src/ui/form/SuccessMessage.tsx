import React from 'react'

interface SuccessMessageProps {
  successMessage: string
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ successMessage }) => (
  <div className={'text-green-500 font-bold'}>{successMessage}</div>
)

export { SuccessMessage }
export type { SuccessMessageProps }
