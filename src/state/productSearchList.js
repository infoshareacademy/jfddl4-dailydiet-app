
const SEARCH_CALORIES = 'productSearchList/SEARCH_CALORIES'
const SEARCH_CATEGORY = 'productSearchList/SEARCH_CATEGORY'
const SLIDER_MAX_VALUE = 'productSearchList/SLIDER_MAX_VALUE'

export const searchCalories = (calories) => ({
    type: SEARCH_CALORIES,
    calories
})
export const searchCategory = (option) => ({
    type: SEARCH_CATEGORY,
    option
})

export const setSliderMaxValue = (sliderMaxValue) => ({
    type: SLIDER_MAX_VALUE,
    sliderMaxValue
})

export const getKcalProperty = () => (dispatch, getState) => {
  dispatch(setSliderMaxValue(getState().products))
}


const initialState = { calories: 699, option: 'every' }

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_CALORIES:
            return (
                { ...state, calories: action.calories }
            )
        case SEARCH_CATEGORY:
            return (
                { ...state, option: action.option }
            )
        
        default:
            return state

    }
}