import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { config as firebaseConfig } from '@src/auth/firebase/firebaseConfig'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const SecondaryApp = firebase.initializeApp(firebaseConfig, 'secondary')
export const SecondaryAuth = SecondaryApp.auth()
export const firebaseAuth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export default firebase
