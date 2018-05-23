import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import products, {initProductSync} from './state/products'
import auth, { initAuthUserSync} from './state/auth'
import favorites from './state/favorites'


export const reducer = combineReducers({
    products,
    auth,
    favorites
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