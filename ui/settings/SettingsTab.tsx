import React from 'react'

interface SettingsTabProps {
  label: string
  onClick?: () => void
}

export const SettingsTab: React.FC<SettingsTabProps> = (props) => {
  const { label, onClick } = props
  return (
    <button
      onClick={onClick}
      className="block w-full text-left text-med dark:text-med-dark text-lg py-1"
    >
      {label}
    </button>
  )
}
