import React from 'react'
import type { Story, Meta } from '@storybook/react'

import {
  UserIconOverlay,
  UserProfile,
  UserTimeline,
  UserTimelineBanner,
} from '../ui/userTimeline/UserTimeline'
import { UserIcon } from '../ui/common/UserIcon'
import { PersonaState } from '../states/UserState'
import { Heading1 } from '../ui/common/Primitives'

export default {
  title: 'UserTimeline/UserTimeline',
  component: UserTimeline,
} as Meta

const src = '/1500x500.jfif'
const Template: Story = () => {
  return (
    <UserTimeline>
      <UserTimelineBanner src={src} width="1000px" height="250px">
        <UserIconOverlay>
          <UserIcon size="medium" src={'/69527915_p0.png'} />
          <UserProfile
            persona={new PersonaState({ id: -1, name: 'minamorl', screenName: '不滅' })}
          />
        </UserIconOverlay>
      </UserTimelineBanner>
      <Heading1>Recent posts</Heading1>
    </UserTimeline>
  )
}

export const DefaultUserTimeline = Template.bind({})
DefaultUserTimeline.args = {}
