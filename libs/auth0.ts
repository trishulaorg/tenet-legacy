import { initAuth0 } from '@auth0/nextjs-auth0'
import { SignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance'

let instance: SignInWithAuth0

export function getInstance(): SignInWithAuth0 {
  if (instance) {
    return instance
  }
  instance = initAuth0({
    baseURL: 'https://' + process.env.VERCEL_URL ?? 'http://localhost:8080',
  })
  return instance
}
