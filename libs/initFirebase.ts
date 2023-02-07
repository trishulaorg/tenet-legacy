// Import the functions you need from the SDKs you need
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Analytics } from 'firebase/analytics'
import { getAnalytics } from 'firebase/analytics'
import type { Auth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const init = (): {
  firebaseConfig: FirebaseOptions
  app: Partial<FirebaseApp>
  analytics: Partial<Analytics>
  auth: Partial<Auth>
} => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyADqaNA3syxV1iPCqbWk7uwwv4KQlnFQMc',
    authDomain: 'trishula-tenet.firebaseapp.com',
    projectId: 'trishula-tenet',
    storageBucket: 'trishula-tenet.appspot.com',
    messagingSenderId: '25225443111',
    appId: '1:25225443111:web:f8e77c603b32e464941b02',
    measurementId: 'G-Y6GD5HPV67',
  }

  if (typeof window === 'undefined') {
    return {
      firebaseConfig,
      app: {},
      analytics: {},
      auth: {},
    }
  }
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  return {
    firebaseConfig,
    app,
    analytics,
    auth,
  }
}
