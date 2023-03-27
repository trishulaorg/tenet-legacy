import React, { useState } from 'react'
import { SettingsTab } from './SettingsTab'
import { ContactSettings } from './ContactSettings'
import { PersonasSettings } from './PersonasSettings'
import { NotificationsSettings } from './NotificationsSettings'
import { ThemeSettings } from './ThemeSettings'
import { BackgroundSettings } from './BackgroundSettings'

//TODO: Make responsive for mobile (change settings categories to submenus below settings)
//TODO: Fix height (currently hardcoding at 768px, want it dynamic with margins at sides for "floating card" style)

const inputStyles =
  'indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark'

const buttonStyles =
  'mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-full bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold'

const uploadButtonStyles =
  'mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-md bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold'

const checkboxStyles =
  'w-6 h-6 my-1 mr-1 accent-primary dark:accent-primary-dark bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark'

export const Settings = () => {
  const [currentTab, setCurrentTab] = useState('Contact Information')

  return (
    <div className="m-4 h-[90vh] overflow-y-auto bg-opacity-70 bg-contentbg dark:bg-contentbg-dark flex flex-row justify-start items-center rounded-lg shadow-lg transition-colors">
      <div className="h-full py-6 px-4 text-med dark:text-med-dark text-2xl border-r-[3px] border-low dark:border-low-dark">
        <div className="py-2">
          <h1 className="font-semibold">Account Settings</h1>
          <SettingsTab
            label="Contact Information"
            currentTab={currentTab}
            onClick={() => setCurrentTab('Contact Information')}
          />
          <SettingsTab
            label="Personas"
            currentTab={currentTab}
            onClick={() => setCurrentTab('Personas')}
          />
          <SettingsTab
            label="Notifications"
            currentTab={currentTab}
            onClick={() => setCurrentTab('Notifications')}
          />
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Interface Settings</h1>
          <SettingsTab
            label="Theme"
            currentTab={currentTab}
            onClick={() => setCurrentTab('Theme')}
          />
          <SettingsTab
            label="Background"
            currentTab={currentTab}
            onClick={() => setCurrentTab('Background')}
          />
        </div>
      </div>
      <div className="py-8 px-4 text-med dark:text-med-dark text-2xl h-full ">
        {currentTab === 'Contact Information' && (
          <ContactSettings buttonStyles={buttonStyles} inputStyles={inputStyles} />
        )}
        {currentTab === 'Personas' && (
          <PersonasSettings
            buttonStyles={buttonStyles}
            inputStyles={inputStyles}
            uploadButtonStyles={uploadButtonStyles}
          />
        )}
        {currentTab === 'Notifications' && (
          <NotificationsSettings buttonStyles={buttonStyles} checkboxStyles={checkboxStyles} />
        )}
        {currentTab === 'Theme' && (
          <ThemeSettings buttonStyles={buttonStyles} checkboxStyles={checkboxStyles} />
        )}
        {currentTab === 'Background' && (
          <BackgroundSettings buttonStyles={buttonStyles} uploadButtonStyles={uploadButtonStyles} />
        )}
      </div>
    </div>
  )
}
