import React, { useState } from 'react'

interface SettingsFormProps {
  currentTab: 'contact' | 'personas' | 'notifications' | 'theme' | 'background' | string
}

export const SettingsForm = (props: SettingsFormProps) => {
  const { currentTab } = props

  if (currentTab === 'contact') {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleEmailChange = (email: string) => {
      console.log('Email changed, new email: ', email)
    }

    const handlePasswordChange = (password: string) => {
      console.log('Password changed, new password: ', password)
    }

    return (
      <div>
        <form className="">
          <h1 className="text-3xl font-normal">Change Email Address</h1>
          <div className="flex flex-col">
            <label className="mt-1 text-lg font-normal">New Email Address</label>
            <input
              type="text"
              placeholder="my_email@email.com"
              className="indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-full bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold"
            onClick={() => handleEmailChange(email)}
          >
            Submit
          </button>
        </form>

        <form className="mt-8">
          <h1 className="text-3xl font-normal">Change Password</h1>
          <div className="flex flex-col">
            <label className="mt-1 text-lg font-normal">Current Password</label>
            <input
              type="password"
              placeholder="********"
              className="indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark"
            />
            <label className="mt-1 text-lg font-normal">New Password</label>
            <input
              type="password"
              placeholder="********"
              className="indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="mt-1 text-lg font-normal">Confirm New Password</label>
            <input
              type="password"
              placeholder="********"
              className="indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1 placeholder-low dark:placeholder-low-dark text-high dark:text-high-dark bg-pagebg dark:bg-pagebg-dark"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-2 py-1 px-8 border-med dark:border-med-dark border-2 rounded-full bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark text-base font-semibold"
            onClick={() => handlePasswordChange(password)}
            disabled={password !== confirmPassword}
          >
            Submit
          </button>
        </form>
      </div>
    )
  } else if (currentTab === 'personas') {
    return <div></div>
  } else if (currentTab === 'notifications') {
    return <div></div>
  } else if (currentTab === 'theme') {
    return <div></div>
  } else if (currentTab === 'background') {
    return <div></div>
  } else {
    return <div></div>
  }
}
