import { auth, GoogleProvider } from '../firebase'

const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const INCORRECT_PASSWORD = 'auth/INCORRECT_PASSWORD'

const loggedIn = (user) => ({
  type: LOGGED_IN,
  user
})

const loggedOut = () => ({
  type: LOGGED_OUT
})

const incorrectPassword = () => ({
  type: INCORRECT_PASSWORD
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

export const logInByMailAndPass = (email, password) => (dispatch, getState) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(user => dispatch(loggedIn(user)))
}

export const createUser = (email, password, passwordRetyped) => (dispatch, getState) => {
  if ( password && password === passwordRetyped) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => dispatch(loggedIn(user)))
  } else {
    dispatch(incorrectPassword())
  }
}

export const logOut = () => (dispatch, getState) => {
  auth.signOut()
}

const initialState = {
  isUserLoggedIn: false,
  user: null,
  error: '',
  imWithError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.user,
        error: '',
        imWithError: false
      }
    case LOGGED_OUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: null,
        error: '',
        imWithError: false
      }
    case INCORRECT_PASSWORD:
      return {
        ...state,
        isUserLoggedIn: false,
        error: 'Incorrect password. Try again.',
        imWithError: true
      }
    default:
      return state
  }
}