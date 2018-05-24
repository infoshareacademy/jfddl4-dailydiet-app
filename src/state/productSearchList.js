const SEARCH_PHRASE = 'productSearchList/SEARCH_PHRASE'

export const searchPhrase = (phrase) => {
    return (
        {
            type: SEARCH_PHRASE,
            phrase
        }
    )
}

const initialState = {phrase: ''}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PHRASE:
            return (
            {...state, phrase: action.phrase }
        )
        default:
            return state

    }
}