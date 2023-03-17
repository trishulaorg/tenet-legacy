import React, { useState } from 'react'
import { SettingsTab } from './SettingsTab'
import { ContactSettings } from './ContactSettings'
import { PersonasSettings } from './PersonasSettings'
import { NotificationsSettings } from './NotificationsSettings'
import { ThemeSettings } from './ThemeSettings'
import { BackgroundSettings } from './BackgroundSettings'

//TODO: Change buttons to tabs: on click, change to tab for that settings category
//TODO: Implement form for settings, including custom text inputs, checkboxes, and submit button
//TODO: Make responsive for mobile (change settings categories to submenus below settings)
//TODO: Fix height (currently hardcoding at 768px, want it dynamic with margins at sides for "floating card" style)
//TODO: Align top of left and right sides' text

const inputStyles =
  'indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark'

const buttonStyles =
  'mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-full bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold'

export const Settings = () => {
  const [currentTab, setCurrentTab] = useState('contact')

  return (
    <div className="m-4 h-full bg-contentbg dark:bg-contentbg-dark flex flex-row justify-start items-center rounded-lg shadow-lg">
      <div className="h-full py-6 px-4 text-med dark:text-med-dark text-2xl border-r-[3px] border-low dark:border-low-dark">
        <div className="py-2">
          <h1 className="font-semibold">Account Settings</h1>
          <SettingsTab label="Contact Information" onClick={() => setCurrentTab('contact')} />
          <SettingsTab label="Personas" onClick={() => setCurrentTab('personas')} />
          <SettingsTab label="Notifications" onClick={() => setCurrentTab('notifications')} />
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Interface Settings</h1>
          <SettingsTab label="Theme" onClick={() => setCurrentTab('theme')} />
          <SettingsTab label="Background" onClick={() => setCurrentTab('background')} />
        </div>
      </div>
      <div className="my-4 px-4 text-med dark:text-med-dark text-2xl h-full py-6">
        {currentTab === 'contact' && (
          <ContactSettings buttonStyles={buttonStyles} inputStyles={inputStyles} />
        )}
        {currentTab === 'personas' && (
          <PersonasSettings buttonStyles={buttonStyles} inputStyles={inputStyles} />
        )}
        {currentTab === 'notifications' && <NotificationsSettings buttonStyles={buttonStyles} />}
        {currentTab === 'theme' && <ThemeSettings buttonStyles={buttonStyles} />}
        {currentTab === 'background' && <BackgroundSettings buttonStyles={buttonStyles} />}
      </div>
    </div>
  )
}
