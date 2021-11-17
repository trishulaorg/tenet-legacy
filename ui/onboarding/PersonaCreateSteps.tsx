import React, { useState } from 'react'

export const PersonaCreateSteps: React.FC = () => {
  const [personaName, setPersonaName] = useState('')

  return (
    <div>
      <form>
        <div>Type new persona name here:</div>
        <input type="text" value={personaName} onChange={(e) => setPersonaName(e.target.value)} />
        <button>OK</button>
      </form>
    </div>
  )
}
