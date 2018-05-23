import { db } from '../firebase'
import { mapObjectToArray } from '../utils'

// ACTIONS TYPES
const ACTUALIZE_FAVORITES = 'products/ACTUALIZE_FAVORITES'
const EXTERNAL_ERROR = 'products/EXTERNAL_ERROR'

// ACTIONS
const actualizeFavorites = (favorites) => ({
  type: ACTUALIZE_FAVORITES,
  favorites
})

const handleExternalError = (error) => ({
  type: EXTERNAL_ERROR,
  error
})

// LOGIC
export const getFavorites = () => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  db.ref(`/users/${userUid}/favorite`)
    .once(
      'value',
      snapshot => {
        const favorites = JSON.parse(snapshot.val())
        dispatch(actualizeFavorites(favorites))
      }
    )
}

export const addFavorite = (key) => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  const newFavorites = getState().favorites.concat(key)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(actualizeFavorites(newFavorites)))
    .catch(error => dispatch(handleExternalError(error)))
}

export const removeFavorite = (key) => (dispatch, getState) => {
  const userUid = getState().auth.user.uid
  const newFavorites = getState().favorites.filter(el => el !== key)
  const newFavoritesSrtingified = JSON.stringify(newFavorites)
  db.ref(`/users/${userUid}/favorites`)
    .set(newFavoritesSrtingified)
    .then(() => dispatch(actualizeFavorites(newFavorites)))
    .catch(error => dispatch(handleExternalError(error)))
}

// INITIAL STATE
const initialState = {
  favorites: [],
  error: '',
  imWithError: false
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZE_FAVORITES:
      return {
        favorites: action.favorites,
        error: '',
        imWithError: false
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