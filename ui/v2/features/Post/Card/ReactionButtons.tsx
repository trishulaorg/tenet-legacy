/* eslint-disable */
import React from 'react'

type Props = {
  likesCount: number
  repliesCount: number
}

export default function ReactionButtons(props: Props) {
  const {likesCount, repliesCount} = props

  return (
  <div className='flex flex-row'>
    <button onClick={() => (console.log("click like"))}>👍{likesCount}</button>
    <button onClick={() => (console.log("click reply"))}>💬{repliesCount}</button>
  </div>
  )
}
