import type { Auth } from 'firebase/auth'

export function isValidAuthInstance(target: Auth | Record<string, never>): target is Auth {
  return Object.keys(target).length !== 0
}
