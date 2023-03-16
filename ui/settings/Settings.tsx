import React from 'react'
import { SettingsTab } from './SettingsTab'
import { SettingsForm } from './SettingsForm'

//TODO: Change buttons to tabs: on click, change to tab for that settings category
//TODO: Implement form for settings, including custom text inputs, checkboxes, and submit button
//TODO: Make responsive for mobile (change settings categories to submenus below settings)
//TODO: Fix height (currently using h-screen, but scrollbar always appears due to margin and nav)

export const Settings = () => {
  return (
    <div className="m-4 h-screen bg-contentbg dark:bg-contentbg-dark flex flex-row items-center rounded-lg shadow-lg">
      <div className="h-full py-6 px-4 text-med dark:text-med-dark text-2xl border-r-[3px] border-low dark:border-low-dark">
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
      <div className="my-4 pl-2 pr-4 text-med dark:text-med-dark text-2xl h-full py-6 px-4">
        <SettingsForm
          formLabel="Contact Information"
          inputs={[
            { inputLabel: 'Email', inputType: 'text', inputPlaceholder: 'my_email@email.com' },
            { inputLabel: 'Password', inputType: 'password', inputPlaceholder: '********' },
          ]}
        />
      </div>
    </div>
  )
}
