import {auth, db, GoogleProvider} from '../firebase'
import moment from "moment/moment";

const MEAL_DATE = 'mealPlan/MEAL_DATE'
const MEAL_PLAN_TO_GET_FROM_DB = 'mealPlan/MEAL_PLAN_TO_GET_FROM_DB'
const MEAL_PLAN_BREAKFAST = 'mealPlan/MEAL_PLAN_BREAKFAST'
const MEAL_PLAN_LUNCH = 'mealPlan/MEAL_PLAN_LUNCH'
const MEAL_PLAN_DINNER = 'mealPlan/MEAL_PLAN_DINNER'


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


export const getBreakfast = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    const mealDate = getState().mealPlan.mealDate
    return db.ref(`/users/${userUid}/meals/${mealDate}/breakfast`).on(
        'value',
        (snapshot) => dispatch(
            mealPlanbreakfast(snapshot.val() || [])
        ))
}

export const mealPlanbreakfast = (breakfastValue) => ({
    type: MEAL_PLAN_BREAKFAST,
    breakfastValue

})


export const getLunch = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    const mealDate = getState().mealPlan.mealDate
    return db.ref(`/users/${userUid}/meals/${mealDate}/lunch`).on(
        'value',
        (snapshot) => dispatch(
            mealPlanLunch(snapshot.val() || [])
        ))
}
export const mealPlanLunch = (lunchValue) => ({
    type: MEAL_PLAN_LUNCH,
    lunchValue

})

export const getDinner = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    const mealDate = getState().mealPlan.mealDate
    return db.ref(`/users/${userUid}/meals/${mealDate}/dinner`).on(
        'value',
        (snapshot) => dispatch(
            mealPlanDinner(snapshot.val() || [])
        ))
}
export const mealPlanDinner = (dinnerValue) => ({
    type: MEAL_PLAN_DINNER,
    dinnerValue

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
            return {
                ...state,
                meals: action.acceptToSeeMealPlan
            }
        case MEAL_PLAN_BREAKFAST :
            return {
                ...state,
                breakfast: action.breakfastValue
            }
        case MEAL_PLAN_LUNCH :
            return {
                ...state,
                lunch: action.lunchValue
            }
        case MEAL_PLAN_DINNER :
            return {
                ...state,
                dinner: action.dinnerValue
            }

        default:
            return state
    }
}