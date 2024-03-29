import React from 'react'

interface BackgroundSettingsProps {
  buttonStyles: string
  uploadButtonStyles: string
}

export const BackgroundSettings: React.FC<BackgroundSettingsProps> = (props) => {
  const { buttonStyles, uploadButtonStyles } = props

  return (
    <div>
      <form className="">
        <h1 className="text-3xl font-normal">Change Background</h1>
        <button className={uploadButtonStyles}> Upload </button>
        <p className="text-lg mt-2">New Background: </p>
        <button className={buttonStyles}>Save</button>
      </form>
    </div>
  )
}
