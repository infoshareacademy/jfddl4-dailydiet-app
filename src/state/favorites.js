import { db } from '../firebase'
import { handleSuccess, handleExternalError } from './alerts'
import { upper } from '../utils'

// ACTIONS TYPES
const ACTUALIZE_FAVORITES = 'favorites/ACTUALIZE_FAVORITES'
const FAVORITE_REQUEST = 'favorites/FAVORITE_REQUEST'
const CLOSE_DIALOG = 'favorites/CLOSE_DIALOG'
const EXTERNAL_ERROR = 'favorites/EXTERNAL_ERROR'

// ACTIONS
const actualizeFavorites = (keys) => ({
  type: ACTUALIZE_FAVORITES,
  keys
})

export const favoriteRequest = (key, name) => ({
  type: FAVORITE_REQUEST,
  key,
  name
})

export const closeDialog = () => ({
  type: CLOSE_DIALOG
})

// LOGIC
export const getFavorites = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  db.ref(`/users/${userUid}/favorites`)
    .once(
      'value',
      snapshot => {
        const favoritesKeys = JSON.parse(snapshot.val())
        if (favoritesKeys) {
          dispatch(actualizeFavorites(favoritesKeys))
        }
      }
    )
}

export const addFavorite = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  const productKey = getState().favorites.requestedKey
  const productName = getState().favorites.requestedName
  const newFavorites = getState().favorites.keys.concat(productKey)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(closeDialog()))
    .then(() => dispatch(getFavorites()))
    .then(() => dispatch(handleSuccess(`${upper(productName)} was succesfully added!`)))
    .catch(error => dispatch(handleExternalError(error)))
}

export const removeFavorite = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  const productKey = getState().favorites.requestedKey
  const productName = getState().favorites.requestedName
  const newFavorites = getState().favorites.keys.filter(el => el !== productKey)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(closeDialog()))
    .then(() => dispatch(getFavorites()))
    .then(() => dispatch(handleSuccess(`${upper(productName)} was succesfully removed!`)))
    .catch(error => dispatch(handleExternalError(error)))
}

// INITIAL STATE
const initialState = {
  keys: [],
  requestedKey: '',
  requestedName: '',
  isDialogOpen: false
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZE_FAVORITES:
      return {
        ...state,
        keys: action.keys,
        error: '',
        imWithError: false
      }
    case FAVORITE_REQUEST:
      return {
        ...state,
        requestedKey: action.key,
        requestedName: action.name,
        isDialogOpen: true
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        requestedKey: '',
        requestedName: '',
        isDialogOpen: false
      }
    case EXTERNAL_ERROR:
      return {
        ...state,
        error: action.error.message,
        imWithError: true
      }
    default:
      return state
  }
}