import type { Persona } from '@/models/persona/Persona'

export type User = {
  __typename?: 'User'
  personas: Persona[]
}
