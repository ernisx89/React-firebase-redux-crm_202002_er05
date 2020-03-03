import { auth, googleProvider } from '../Firebase'
//for login
export const GET_USER = 'get_user'
export function getUser() {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user
      })
    })
  }
}

export function login(email, password) {
  //redux thunk will take a work
  return dispatch => auth.signInWithEmailAndPassword(email, password)
}

export function logout() {
  return dispatch => auth.signOut()
}

//google auth
export function googleLogin() {
  return dispatch => auth.signInWithPopup(googleProvider)
}