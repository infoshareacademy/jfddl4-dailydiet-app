import { db } from '../firebase'

// ACTIONS TYPES
const ACTUALIZE_FAVORITES = 'products/ACTUALIZE_FAVORITES'
const FAVORITE_REQUEST = 'products/FAVORITE_REQUEST'
const CLOSE_DIALOG = 'products/CLOSE_DIALOG'
const EXTERNAL_ERROR = 'products/EXTERNAL_ERROR'

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

const handleExternalError = (error) => ({
  type: EXTERNAL_ERROR,
  error
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
  const newFavorites = getState().favorites.keys.concat(productKey)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(closeDialog()))
    .then(() => dispatch(getFavorites()))
    .catch(error => dispatch(handleExternalError(error)))
}

export const removeFavorite = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  const productKey = getState().favorites.requestedKey
  const newFavorites = getState().favorites.keys.filter(el => el !== productKey)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(closeDialog()))
    .then(() => dispatch(getFavorites()))
    .catch(error => dispatch(handleExternalError(error)))
}

// INITIAL STATE
const initialState = {
  keys: [],
  requestedKey: '',
  requestedName: '',
  isDialogOpen: false,
  error: '',
  imWithError: false
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