import {db} from '../firebase'
import moment from "moment/moment";
import {mapObjectToArray} from "../utils";

const MEAL_DATE = 'mealPlan/MEAL_DATE'
const MEAL_PLAN_TO_GET_FROM_DB = 'mealPlan/MEAL_PLAN_TO_GET_FROM_DB'


export const mealSyncer = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    const mealDate = getState().mealPlan.mealDate
    return db.ref(`/users/${userUid}/meals/${mealDate}`).on(
        'value',
        (snapshot) => dispatch(
            mealPlanToGetFromDB(snapshot.val() || [])
        ))
}

export const mealDate = (dateOfMeal) => ({
    type: MEAL_DATE,
    dateOfMeal
})

export const mealPlanToGetFromDB = (acceptToSeeMealPlan) => ({
    type: MEAL_PLAN_TO_GET_FROM_DB,
    acceptToSeeMealPlan
})

const initialState = {}

export default (state = initialState, action) => {

    switch (action.type) {
        case MEAL_DATE :
            return {
                ...state,
                mealDate: moment(action.dateOfMeal).format('DD-MM-YYYY')
            }

        case MEAL_PLAN_TO_GET_FROM_DB :

            const meals = action.acceptToSeeMealPlan
            const breakfast = meals.breakfast
            const lunch = meals.lunch
            const dinner = meals.dinner

            const justBreakfastProducts = mapObjectToArray(breakfast).map(el => {
                return el.product
            })
            const justLunchProducts = mapObjectToArray(lunch).map(el => {
                return el.product
            })
            const justDinnerProducts = mapObjectToArray(dinner).map(el => {
                return el.product
            })

            return {
                ...state,
                meals,
                breakfast: justBreakfastProducts,
                lunch: justLunchProducts,
                dinner: justDinnerProducts,}

        default:
            return state
    }
}