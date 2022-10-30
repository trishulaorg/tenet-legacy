import { observer } from 'mobx-react'
import type { PersonaState } from '../../states/UserState'
import { Heading1, Heading2 } from '../common/Primitives'

export const UserTimeline: React.FC = ({ children }) => {
  return <div>{children}</div>
}

type UserTimelineBannerProps = {
  src: string
  width: string
  height: string
}

export const UserTimelineBanner: React.FC<UserTimelineBannerProps> = ({
  src,
  width,
  height,
  children,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${src}')`,
        width,
        height,
        objectFit: 'fill',
        position: 'relative',
      }}
      className={'rounded'}
    >
      {children}
    </div>
  )
}

export const UserIconOverlay: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.4)',
        position: 'absolute',
        bottom: '0',
        left: '20px',
      }}
      className="flex"
    >
      {children}
    </div>
  )
}

export const UserProfile: React.FC<{ persona: PersonaState }> = observer(({ persona }) => {
  return (
    <div className={'h-full w-[400px] flex-1'}>
      <Heading1>{persona.screenName}</Heading1>
      <Heading2>@{persona.name}</Heading2>
      <p>Coton.appメインオーサー</p>
    </div>
  )
})
