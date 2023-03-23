import type { Persona } from '@/domain/models/persona/Persona'

export type User = {
  __typename?: 'User'
  personas: Persona[]
}
