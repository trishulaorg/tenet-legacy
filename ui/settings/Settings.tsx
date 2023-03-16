import React from 'react'
import { SettingsTab } from './SettingsTab'

//TODO: Change buttons to tabs: on click, change to tab for that settings category
//TODO: Implement form for settings, including custom text inputs, checkboxes, and submit button
//TODO: Make responsive for mobile (change settings categories to submenus below settings)

export const Settings = () => {
  return (
    <div className="m-4 p-2 bg-contentbg dark:bg-contentbg-dark flex flex-row items-center rounded-lg shadow-lg">
      <div className="my-4 pl-2 pr-4 text-med dark:text-med-dark text-2xl border-r-2 border-low dark:border-low-dark">
        <div className="py-2">
          <h1 className="font-semibold">Account Settings</h1>
          <SettingsTab label="Contact Information" />
          <SettingsTab label="Personas" />
          <SettingsTab label="Notifications" />
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Interface Settings</h1>
          <SettingsTab label="Theme" />
          <SettingsTab label="Background" />
        </div>
      </div>
    </div>
  )
}
