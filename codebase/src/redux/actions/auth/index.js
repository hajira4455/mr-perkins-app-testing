// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import firebase, {
  firebaseAuth,
  firestore,
  SecondaryAuth
} from '../../../utility/firebase'

const config = useJwt.jwtConfig

// Init firebase if not already initialized

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
      [config.storageTokenKeyName]: null,
      [config.storageRefreshTokenKeyName]: null
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    // localStorage.removeItem(config.storageTokenKeyName)
    // localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
export const submitRegisterWithFireBase = (username, email, password) => {
  console.log(email, password)
  return () => {
    return firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebaseAuth.signOut()
        firestore
          .collection('users')
          .doc(user.user.uid)
          .set({
            name: username,
            email,
            status: 'pending',
            created: new Date(),
            type: 'user'
          })
        user.user.updateProfile({
          displayName: username,
          photoURL: 'user'
        })
        return user
      })
  }
}
function RetriveLoginData (dispatch, user) {
  if (user.uid) {
    firestore
      .collection('users')
      .doc(user.uid)
      .get()
      .then(localUser => {
        if (localUser.exists) {
          dispatch({
            type: 'LOGIN_WITH_EMAIL',
            payload: {
              type: localUser.data().type,
              user: localUser.data(),
              id: localUser.id,
              isSignedIn: true,
              loggedInWith: 'firebase'
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    if (user.photoURL) {
      dispatch({
        type: 'LOGIN_WITH_EMAIL',
        payload: {
          type: user.photoURL,
          user,
          isSignedIn: true,
          loggedInWith: 'firebase'
        }
      })
    } else {
      dispatch({
        type: 'LOGIN_WITH_EMAIL',
        payload: {
          type: 'admin',
          user,
          isSignedIn: true,
          loggedInWith: 'firebase'
        }
      })
    }
  }

  localStorage.setItem('userData', JSON.stringify(user))
}
// Login firebase
export const submitLoginWithFireBase = (email, password, remember) => {
  return dispatch => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          // result.user.updateProfile({
          //   displayName: "Admin"
          // })
          const name = result.user.displayName

          if (user) {
            RetriveLoginData(dispatch, user)
          }
          // validar remember
          if (user && remember) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => {
                dispatch({
                  type: 'LOGIN_WITH_EMAIL',
                  payload: {
                    email: userEmail,
                    name,
                    isSignedIn: loggedIn,
                    remember: true,
                    loggedInWith: 'firebase'
                  }
                })
              })
            localStorage.setItem('userData', JSON.stringify(user))
          }
          console.log('Login correcto!!!')
        })
      })
      .catch(() => {
        console.log('Email y/o contraseña incorrectos')
      })
  }
}

export const firstLoadingAuth = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      RetriveLoginData(dispatch, user)
      dispatch({
        type: 'CHANGE_AUTHENTICATED',
        payload: {
          authenticated: !!user,
          initializing: false
        }
      })
    })
  }
}
