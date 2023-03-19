import type { PersonaIconUrl } from './PersonaIconUrl'
import type { PersonaId } from './PersonaId'
import type { PersonaName } from './PersonaName'
import type { PersonaScreenName } from './PersonaScreenName'

export type Persona = {
  __typename?: 'Persona'
  id: PersonaId
  name: PersonaName
  screenName: PersonaScreenName
  iconUrl: PersonaIconUrl
}
