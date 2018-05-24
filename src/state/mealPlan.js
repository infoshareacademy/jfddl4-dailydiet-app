import {auth, db, GoogleProvider} from '../firebase'
import moment from "moment/moment";

const MEAL_DATE = 'mealPlan/MEAL_DATE'
const MEAL_TIME = 'mealPlan/MEAL_TIME'
const MEAL_PLAN_TO_GET_FROM_DB = 'mealPlan/MEAL_PLAN_TO_GET_FROM_DB'

export const mealSyncer = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    const mealDate = getState().mealPlan.mealDate
    const mealTime = getState().mealPlan.mealTime
    return db.ref(`/users/${userUid}/meals/${mealDate}/${mealTime}`).on(
        'value',
        (snapshot) => dispatch(
            mealPlanToGetFromDB(snapshot.val() || [])
        ))
}

export const mealDate = (dateOfMeal) => ({
    type: MEAL_DATE,
    dateOfMeal
})

export const mealTime = (timeOfMeal) => ({
    type: MEAL_TIME,
    timeOfMeal
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
        case MEAL_TIME :
            return {
                ...state,
                mealTime: action.timeOfMeal
            }
        case MEAL_PLAN_TO_GET_FROM_DB :
            return {
                ...state,
                meals: action.acceptToSeeMealPlan
            }

        default:
            return state
    }
}