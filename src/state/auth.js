import { auth, GoogleProvider } from '../firebase'

const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'

const loggedIn = (user) => ({
  type: LOGGED_IN,
  user
})

const loggedOut = () => ({
  type: LOGGED_OUT
})

export const initAuthUserSync = () => (dispatch, getState) => {
  auth.onAuthStateChanged(
    user => {
      user ?
      dispatch(loggedIn(user))
      :
      dispatch(loggedOut())
    }
  )
}

export const logInByGoogle = () => (dispatch, getState) => {
  auth.signInWithPopup(GoogleProvider)
}

export const logOut = () => (dispatch, getState) => {
  auth.signOut()
}

const initialState = {
  isUserLoggedIn: false,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.user
      }
    case LOGGED_OUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}