import React, { useState } from 'react'

interface PersonasSettingsProps {
  buttonStyles: string
  inputStyles: string
}

export const PersonasSettings = (props: PersonasSettingsProps) => {
  const { buttonStyles, inputStyles } = props

  const [personaname, setPersonaName] = useState('')

  const handleNameChange = (name: string) => {
    console.log(name)
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
    </div>
  )
}
