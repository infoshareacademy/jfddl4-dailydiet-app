import { db } from '../firebase'
import { mapObjectToArray } from '../utils'

const SET = 'products/SET'

const set = (products) => ({
    type: SET,
    products
})

export const initProductSync = () => (dispatch, getState) => {
    db.ref('/products').on(
        'value',
        (snapshot) => {
            dispatch(
                set(
                    mapObjectToArray(snapshot.val())
                )
            )
       
        }
    )
}

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case SET:
            return action.products
        default:
            return state
    }
}