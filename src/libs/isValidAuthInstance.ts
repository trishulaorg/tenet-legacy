import type { Auth } from 'firebase/auth'

export function isValidAuthInstance(target: Partial<Auth>): target is Auth {
  return Object.keys(target).length !== 0
}
