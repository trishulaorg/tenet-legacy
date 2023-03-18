/* eslint-disable no-console */
import React, { useState } from 'react'

interface ContactSettingsProps {
  buttonStyles: string
  inputStyles: string
}

export const ContactSettings = (props: ContactSettingsProps) => {
  const { buttonStyles, inputStyles } = props

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
            className={inputStyles}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={buttonStyles} onClick={() => handleEmailChange(email)}>
          Submit
        </button>
      </form>

      <form className="mt-8">
        <h1 className="text-3xl font-normal">Change Password</h1>
        <div className="flex flex-col">
          <label className="mt-1 text-lg font-normal">Current Password</label>
          <input type="password" placeholder="********" className={inputStyles} />
          <label className="mt-1 text-lg font-normal">New Password</label>
          <input
            type="password"
            placeholder="********"
            className={inputStyles}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="mt-1 text-lg font-normal">Confirm New Password</label>
          <input
            type="password"
            placeholder="********"
            className={inputStyles}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className={buttonStyles}
          onClick={() => handlePasswordChange(password)}
          disabled={password !== confirmPassword}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
