import React, { useState } from 'react'
import classNames from 'classnames'

export interface SwitchButtonProps {
  label: string
  initialValue: boolean
  onToggle: (value: boolean) => void
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label, initialValue, onToggle }) => {
  const [isOn, setIsOn] = useState<boolean>(initialValue)

  const handleToggle = () => {
    const newState = !isOn
    setIsOn(newState)
    onToggle(newState)
  }

  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <button
        className={classNames(
          'relative inline-block w-10 h-6 transition duration-200 rounded-full ',
          isOn ? 'bg-blue-500' : 'bg-gray-400'
        )}
        onClick={handleToggle}
      >
        <span
          className={classNames(
            'block absolute inset-0 w-4 h-4 transition duration-200 transform',
            isOn ? 'translate-x-2' : ''
          )}
        >
          <span
            className={classNames(
              'absolute top-1/7 left-0 inline-block w-full h-full transform',
              isOn ? 'translate-x-full' : ''
            )}
          >
            <span
              className={classNames(
                'relative inline-block w-5 h-5 transition duration-200 transform',
                isOn ? 'translate-x-0' : ''
              )}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white rounded-full shadow-md" />
            </span>
          </span>
        </span>
      </button>
    </div>
  )
}

export default SwitchButton
