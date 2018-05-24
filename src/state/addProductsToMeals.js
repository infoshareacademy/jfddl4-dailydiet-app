import {auth, db, GoogleProvider} from '../firebase'
import moment from "moment/moment";

const ADD_DATE = 'addProductsToMeals/ADD_DATE'
const ADD_MEAL = 'addProductsToMeals/ADD_MEAL'

export const addDate = (dateOfMealValue) => ({
    type: ADD_DATE,
    dateOfMealValue
})
export const addMeal = (mealValue) => ({
    type: ADD_MEAL,
    mealValue
})

export const addProductToMeal = (myProduct) => (dispatch, getState) => {
    const mealsDate = getState().addProductsToMeals.dateOfMeal
    const userUid = getState().auth.user.uid
    const productKey = myProduct
    const mealTime = getState().addProductsToMeals.meal
    const newProductToMeal = db.ref(`/users/${userUid}/meals/${mealsDate}/${mealTime}`)
        .push()
        .set({
            product: productKey
        })
        .then(alert(`Item was succesfully added to your calendar`))
}


const initialState = {}

export default (state = initialState, action) => {


    switch (action.type) {
        case ADD_DATE:

            return {
                ...state,
                dateOfMeal: moment(action.dateOfMealValue).format('DD-MM-YYYY'),

            }
        case ADD_MEAL:
            return {
                ...state,
                meal: action.mealValue
            }
        default:
            return state
    }
}