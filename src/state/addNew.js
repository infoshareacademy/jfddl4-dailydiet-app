import { db } from '../firebase'
import { getFavorites } from './favorites'
import { handleSuccess } from './alerts'
import { upper } from '../utils'

// ACTIONS TYPES
const NEW_PRODUCT_ADDED = 'addNew/NEW_PRODUCT_ADDED'
const INTERNAL_ERROR = 'addNew/INTERNAL_ERROR'
const EXTERNAL_ERROR = 'addNew/EXTERNAL_ERROR'

// ACTIONS
const newProductAdded = () => ({
  type: NEW_PRODUCT_ADDED
})

export const handleInternalError = (error) => ({
  type: INTERNAL_ERROR,
  error
})

const handleExternalError = (error) => ({
  type: EXTERNAL_ERROR,
  error
})

// LOGIC
export const addNewToDatabase = (
  name,
  category,
  picture,
  calories,
  proteins,
  carbohydrates,
  fat,
  isFavorite
) => (dispatch, getState) => {
  const newProductKey = db.ref(`/products`).push().key
  if (isFavorite) {
    const userUid = getState().auth.user.uid
    const newFavorites = getState().favorites.keys.concat(newProductKey)
    const newFavoritesSrtingified = JSON.stringify(newFavorites)
    db.ref(`/users/${userUid}/favorites`)
      .set(newFavoritesSrtingified)
      .then(dispatch(getFavorites()))
      .then(() => dispatch(handleSuccess(`${upper(name)} was succesfully added!`)))
      .catch(error => dispatch(handleExternalError(error)))
  }
  db.ref(`/products/${newProductKey}`)
    .set({
      name,
      category,
      picture,
      calories,
      proteins,
      carbohydrates,
      fat
    })
    .then(() => dispatch(newProductAdded()))
    .catch(error => dispatch(handleExternalError(error)))
}

// INITIAL STATE
const initialState = {
  alert: '',
  imWithError: false
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_PRODUCT_ADDED:
      return {
        ...state,
        alert: 'Product has been succesfully added :)',
        imWithError: true
      }
    case INTERNAL_ERROR:
      return {
        ...state,
        alert: action.error,
        imWithError: true
      }
    case EXTERNAL_ERROR:
      return {
        ...state,
        alert: action.error.message,
        imWithError: true
      }
    default:
      return state
  }
}
