import React, { useState } from 'react'
import { SettingsTab } from './SettingsTab'
import { SettingsForm } from './SettingsForm'

//TODO: Change buttons to tabs: on click, change to tab for that settings category
//TODO: Implement form for settings, including custom text inputs, checkboxes, and submit button
//TODO: Make responsive for mobile (change settings categories to submenus below settings)
//TODO: Fix height (currently hardcoding at 768px, want it dynamic with margins at sides for "floating card" style)

export const Settings = () => {
  const [currentTab, setCurrentTab] = useState('contact')

  const handleTabClick = (tab: string) => () => {
    setCurrentTab(tab)
  }

  return (
    <div className="m-4 h-full bg-contentbg dark:bg-contentbg-dark flex flex-row justify-start items-center rounded-lg shadow-lg">
      <div className="h-full py-6 px-4 text-med dark:text-med-dark text-2xl border-r-[3px] border-low dark:border-low-dark">
        <div className="py-2">
          <h1 className="font-semibold">Account Settings</h1>
          <SettingsTab label="Contact Information" onClick={() => handleTabClick('contact')} />
          <SettingsTab label="Personas" onClick={() => handleTabClick('personas')} />
          <SettingsTab label="Notifications" onClick={() => handleTabClick('notifications')} />
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Interface Settings</h1>
          <SettingsTab label="Theme" onClick={() => handleTabClick('theme')} />
          <SettingsTab label="Background" onClick={() => handleTabClick('background')} />
        </div>
      </div>
      <div className="my-4 px-4 text-med dark:text-med-dark text-2xl h-full py-6">
        <SettingsForm currentTab={currentTab} />
      </div>
    </div>
  )
}
