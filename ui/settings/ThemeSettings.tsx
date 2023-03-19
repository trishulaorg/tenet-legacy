import React from 'react'
import { useTheme } from 'next-themes'

interface ThemeSettingsProps {
  buttonStyles: string
  checkboxStyles: string
}

export const ThemeSettings = (props: ThemeSettingsProps) => {
  const { buttonStyles, checkboxStyles } = props
  const { theme, setTheme, systemTheme } = useTheme()
  return (
    <div>
      <form className="">
        <h1 className="text-3xl font-normal mb-2">Change Theme</h1>
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-1">
            <input
              type="checkbox"
              className={checkboxStyles}
              checked={theme == 'system' ? systemTheme == 'dark' : theme == 'dark'}
              onChange={() => {
                setTheme(
                  theme == 'system'
                    ? systemTheme == 'dark'
                      ? 'light'
                      : 'dark'
                    : theme == 'dark'
                    ? 'light'
                    : 'dark'
                )
              }}
            />
            <label className="mt-1 text-xl font-normal">Dark theme</label>
          </div>
        </div>
        <button className={buttonStyles}>Save</button>
      </form>
    </div>
  )
}
