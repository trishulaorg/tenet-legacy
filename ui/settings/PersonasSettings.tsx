import React, { useState } from 'react'

interface PersonasSettingsProps {
  buttonStyles: string
  inputStyles: string
}

const uploadButtonStyles =
  'mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-md bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold'

export const PersonasSettings = (props: PersonasSettingsProps) => {
  const { buttonStyles, inputStyles } = props

  const [personaname, setPersonaName] = useState('')

  const handleNameChange = (name: string) => {
    console.log(name)
  }

  const handleAvatarChange = (avatar: string) => {
    console.log(avatar)
  }

  return (
    <div>
      <form className="">
        <h1 className="text-3xl font-normal">Change Display Name</h1>
        <div className="flex flex-col">
          <label className="mt-1 text-lg font-normal">New Display Name</label>
          <input
            type="text"
            placeholder="MyNewName"
            className={inputStyles}
            onChange={(e) => setPersonaName(e.target.value)}
          />
        </div>
        <button className={buttonStyles} onClick={() => handleNameChange(personaname)}>
          Submit
        </button>
      </form>

      <form className="mt-8">
        <h1 className="text-3xl font-normal">Change Avatar</h1>
        <button className={uploadButtonStyles}> Upload </button>
        <p className="text-lg mt-2">New Avatar: </p>
        <button className={buttonStyles} onClick={() => handleAvatarChange('')}>
          Save
        </button>
      </form>
    </div>
  )
}
