import React from 'react'

interface SettingsTabProps {
  label: string
  currentTab: string
  onClick?: () => void
}

export const SettingsTab: React.FC<SettingsTabProps> = (props) => {
  const { label, currentTab, onClick } = props
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left text-med dark:text-med-dark text-lg py-1 pl-2 ${
        currentTab === label && `border-l-[3px] border-primary dark:border-primary-dark`
      }`}
    >
      {label}
    </button>
  )
}
