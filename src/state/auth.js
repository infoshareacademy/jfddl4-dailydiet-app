import { auth, db, GoogleProvider } from '../firebase'

// ACTIONS TYPES
const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const INTERNAL_ERROR = 'auth/INTERNAL_ERROR'
const EXTERNAL_ERROR = 'auth/EXTERNAL_ERROR'

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
  } else if (!password) {
    dispatch(handleInternalError('Password is required'))
  } else if (!email) {
    dispatch(handleInternalError('Email is required'))
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

// INITIAL STATE
const initialState = {
  isUserLoggedIn: false,
  user: null,
  error: '',
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
        error: '',
        imWithError: false,
      }
    case LOGGED_OUT:
      return initialState
    case INTERNAL_ERROR:
      return {
        ...state,
        isUserLoggedIn: false,
        error: action.error,
        imWithError: true
      }
    case EXTERNAL_ERROR:
      return {
        ...state,
        isUserLoggedIn: false,
        error: action.error.message,
        imWithError: true
      }
    default:
      return state
  }
}
