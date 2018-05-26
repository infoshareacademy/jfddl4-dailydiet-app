// ACTIONS TYPES
const SUCCESS = 'alert/SUCCESS'
const INTERNAL_ERROR = 'alert/INTERNAL_ERROR'
const EXTERNAL_ERROR = 'alert/EXTERNAL_ERROR'

// ACTIONS
export const handleSuccess = (message) => ({
  type: SUCCESS,
  message
})

export const handleInternalError = (error) => ({
  type: INTERNAL_ERROR,
  error
})

export const handleExternalError = (error) => ({
  type: EXTERNAL_ERROR,
  error
})

// INITIAL STATE
const initialState = {
  alert: '',
  imWithAlert: false
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        alert: action.message,
        imWithAlert: true
      }
    case INTERNAL_ERROR:
      return {
        ...state,
        alert: action.error,
        imWithAlert: true
      }
    case EXTERNAL_ERROR:
      return {
        ...state,
        alert: action.error.message,
        imWithAlert: true
      }
    default:
      return state
  }
}
