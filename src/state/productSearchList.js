const SEARCH_PHRASE = 'productSearchList/SEARCH_PHRASE'
const SEARCH_CALORIES = 'productSearchList/SEARCH_CALORIES'
const SEARCH_CATEGORY = 'productSearchList/SEARCH_CATEGORY'

export const searchPhrase = (phrase) => {
    return (
        {
            type: SEARCH_PHRASE,
            phrase
        }
    )
}
export const searchCalories = (calories) => {
    type: SEARCH_CALORIES,
        calories
}
export const searchCategory = (option) => {
    type: SEARCH_CATEGORY,
        option
}


const initialState = { phrase: '', calories: 0, option: 'every'  }

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PHRASE:
            return (
                { ...state, phrase: action.phrase }
            )
        case SEARCH_CALORIES:
            return (
                { ...state, calories: action.calories }
            )
        case SEARCH_CALORIES:
            return (
                { ...state, option: action.option }
            )
        default:
            return state

    }
}