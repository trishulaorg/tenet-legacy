import React from 'react'
import { PersonaState } from '../../states/UserState'
import { Author } from './Author'
import { ActivityCardTitle } from './ActivityCardTitle'
import { ActivityCardContent } from './ActivityCardContent'
import { ActivityCardIcons } from './ActivityCardIcons'
import { ActivityCardMeta } from './ActivityCardMeta'
import { CreatedAt } from './CreatedAt'

export const ActivityCard: React.FC<{ title: string; content: string; author: PersonaState }> = ({
  title,
  content,
  author,
}) => {
  const time = new Date().toISOString()
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white">
      <ActivityCardTitle title={title} />
      <Author name={author.name} iconUrl="http://example.com/" /> {/* TODO: replace iconUrl */}
      <ActivityCardContent content={content} />
      <ActivityCardMeta>
        <ActivityCardIcons />
        <div className="pb-2"></div>
        <CreatedAt created={time} />
      </ActivityCardMeta>
    </div>
  )
}
