import { initAuth0 } from '@auth0/nextjs-auth0'
import type { SignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance'

let instance: SignInWithAuth0

export function getInstance(): SignInWithAuth0 {
  if (instance) {
    return instance
  }
  instance = initAuth0({
    baseURL: process.env['VERCEL_URL']
      ? 'https://' + process.env['VERCEL_URL']
      : 'http://localhost:3000',

    routes: {
      /**
       * Either a relative path to the application or a valid URI to an external domain.
       * This value must be registered on the authorization server.
       * The user will be redirected to this after a logout has been performed.
       */
      postLogoutRedirect: '/',

      /**
       * Relative path to the application callback to process the response from the authorization server.
       */
      callback: '/api/auth/callback',
    },
  })
  return instance
}
