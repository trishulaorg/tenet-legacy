import { init } from '../libs/initFirebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useEffect } from 'react'

const AuthPage: React.FC = () => {
  const { auth } = init()
  useEffect(() => {
    document.cookie = 'gqltoken='
  })
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  )
}

export default AuthPage
