import React, { useState } from 'react'

interface NotificationsSettingsProps {
  buttonStyles: string
}

const checkboxStyles =
  'w-6 h-6 my-1 mr-1 accent-primary dark:accent-primary-dark bg-pagebg dark:bg-pagebg-dark text-med dark:text-med-dark'

export const NotificationsSettings = (props: NotificationsSettingsProps) => {
  const { buttonStyles } = props

  const [likes, setLikes] = useState(false)
  const [comments, setComments] = useState(false)
  const [follows, setFollows] = useState(false)

  const handleNotificationsChange = (likes: boolean, comments: boolean, follows: boolean) => {
    console.log('Notifications changed, new notifications: ', likes, comments, follows)
  }

  return (
    <div>
      <form className="">
        <h1 className="text-3xl font-normal mb-2">Change Notifications</h1>
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-1">
            <input
              type="checkbox"
              className={checkboxStyles}
              checked={likes}
              onChange={() => setLikes(!likes)}
            />
            <label className="mt-1 text-xl font-normal">Likes</label>
          </div>
          <div className="flex flex-row items-center mb-1">
            <input
              type="checkbox"
              className={checkboxStyles}
              checked={comments}
              onChange={() => setComments(!comments)}
            />
            <label className="mt-1 text-xl font-normal">Comments</label>
          </div>
          <div className="flex flex-row items-center mb-1">
            <input
              type="checkbox"
              className={checkboxStyles}
              checked={follows}
              onChange={() => setFollows(!follows)}
            />
            <label className="mt-1 text-xl font-normal">Follows</label>
          </div>
        </div>
        <button
          className={buttonStyles}
          onClick={() => handleNotificationsChange(likes, comments, follows)}
        >
          Save
        </button>
      </form>
    </div>
  )
}
