import { auth, db, GoogleProvider } from '../firebase'
import {logInsSyncer} from './loginLogs'

// ACTIONS TYPES
const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const INTERNAL_ERROR = 'auth/INTERNAL_ERROR'
const EXTERNAL_ERROR = 'auth/EXTERNAL_ERROR'
const EMAIL_SENT = 'auth/EMAIL_SENT'

// ACTIONS
const loggedIn = (user) => ({
  type: LOGGED_IN,
  user
})

const loggedOut = () => ({
  type: LOGGED_OUT
})

const handleInternalError = (error) => ({
  type: INTERNAL_ERROR,
  error
})

const handleExternalError = (error) => ({
  type: EXTERNAL_ERROR,
  error
})

const emailSent = () => ({
  type: EMAIL_SENT
})

// LOGIC
const logUserLogIn = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  db.ref(`/users/${userUid}/loginsLogs`)
    .push({ timestamp: Date.now() })
}

export const initAuthUserSync = () => (dispatch, getState) => {
  auth.onAuthStateChanged(
    user => {
      if (user) {
        dispatch(loggedIn(user))
        dispatch(logUserLogIn())
        dispatch(logInsSyncer())
      } else {
        dispatch(loggedOut())
      }
    }
  )
}

export const logOut = () => (dispatch, getState) => {
  auth.signOut()
}

export const logInByGoogle = () => (dispatch, getState) => {
  auth.signInWithPopup(GoogleProvider)
    .catch(error => dispatch(handleExternalError(error)))
}

export const logInByMailAndPass = (email, password) => (dispatch, getState) => {
  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(user => dispatch(loggedIn(user)))
      .catch(error => dispatch(handleExternalError(error)))
  } else if (!email) {
    dispatch(handleInternalError('Email is required'))
  } else if (!password) {
    dispatch(handleInternalError('Password is required'))
  }
}

export const createUser = (email, password, passwordRetyped) => (dispatch, getState) => {
  if (email && password && password === passwordRetyped) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => dispatch(loggedIn(user)))
      .catch(error => dispatch(handleExternalError(error)))
  } else if (!password) {
    dispatch(handleInternalError('Password is required'))
  } else if (!email) {
    dispatch(handleInternalError('Email is required'))
  } else if (password !== passwordRetyped) {
    dispatch(handleInternalError('Passwords do not match'))
  }
}

export const restorePassword = (email) => (dispatch, getState) => {
  if (email) {
    auth.sendPasswordResetEmail(email)
      .then(() => dispatch(emailSent()))
      .catch(error => dispatch(handleExternalError(error)))
  }
}

// INITIAL STATE
const initialState = {
  isUserLoggedIn: false,
  user: null,
  alert: '',
  imWithError: false
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.user,
        alert: '',
        imWithError: false,
      }
    case LOGGED_OUT:
      return initialState
    case INTERNAL_ERROR:
      return {
        ...state,
        isUserLoggedIn: false,
        alert: action.error,
        imWithError: true
      }
    case EXTERNAL_ERROR:
      return {
        ...state,
        isUserLoggedIn: false,
        alert: action.error.message,
        imWithError: true
      }
    case EMAIL_SENT:
      return {
        ...state,
        isUserLoggedIn: false,
        alert: 'An email has been sent :) Check your mailbox.',
        imWithError: true
      }
    default:
      return state
  }
}
