import type { Persona } from '@/src/domain/models/persona/Persona'

export type User = {
  __typename?: 'User'
  personas: Persona[]
}
