import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productSearchList from './state/productSearchList'
import products, {initProductSync} from './state/products'
import auth, {initAuthUserSync} from './state/auth'
import loginsLogs from './state/loginLogs'
import addProductsToMeals from './state/addProductsToMeals'
import mealPlan from './state/mealPlan'

import favorites from './state/favorites'
import alerts from './state/alerts'

export const reducer = combineReducers({
    mealPlan,
    addProductsToMeals,
    loginsLogs,
    products,
    auth,
    favorites,
    alerts,
    productSearchList
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.dispatch(initAuthUserSync())
store.dispatch(initProductSync())
