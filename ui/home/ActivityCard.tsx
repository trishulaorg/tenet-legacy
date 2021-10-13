import React from 'react'
import { PersonaState } from '../../states/UserState'
import { Author } from './Author'
import { ActivityCardTitle } from './ActivityCardTitle'
import { ActivityCardContent } from './ActivityCardContent'
import { ActivityCardFooter } from './ActivityCardFooter'

export const ActivityCard: React.FC<{ title: string; content: string; author: PersonaState }> = ({
  title,
  content,
  author,
}) => {
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white">
      <ActivityCardTitle title={title} />
      <Author name={author.name} iconUrl="http://example.com/" /> {/* TODO: replace iconUrl */}
      <ActivityCardContent content={content} />
      <ActivityCardFooter />
      {/* <ActivityCardMeta>
        <CreatedAt created={someInstanceOfDateTime} />
      </ActivityCardMeta> */}
    </div>
  )
}
