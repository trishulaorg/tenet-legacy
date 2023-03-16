import React from 'react'

//TODO: Change buttons to tabs: on click, change to tab for that settings category
//TODO: Implement form for settings, including custom text inputs, checkboxes, and submit button
//TODO: Make responsive for mobile (change settings categories to submenus below settings)

export const Settings = () => {
  return (
    <div className="m-4 p-2 bg-contentbg dark:bg-contentbg-dark flex flex-row items-center">
      <div className="my-4 text-med dark:text-med-dark text-2xl">
        <div>
          <h1>Account Settings</h1>
          <button>Contact information</button>
          <button>Personas</button>
          <button>Notifications</button>
        </div>
        <div>
          <h1>Interface Settings</h1>
          <button>Theme</button>
          <button>Background</button>
        </div>
      </div>
      <div className="my-4 text-med dark:text-med-dark text-2xl" />
    </div>
  )
}
