import { observer } from 'mobx-react'
import type { FormEventHandler } from 'react'
import React from 'react'
import { useUserState } from '../../states/UserState'

const PersonaIconForm: React.FC = observer(() => {
  const userState = useUserState()

  const onIconSet = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return
    }
  }

  const setPersonaIcon: FormEventHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <form>
        <h1 className="my-4 text-med dark:text-med-dark text-2xl">
          Icon for {userState?.currentPersona?.name}
        </h1>
        <input
          type="file"
          onChange={onIconSet}
          multiple={false}
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          className="text-high dark:text-high-dark"
        />

        <button
          onClick={(e) => setPersonaIcon(e)}
          className="my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300"
        >
          Set Icon
        </button>
      </form>
    </div>
  )
})

export { PersonaIconForm }
