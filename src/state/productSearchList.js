import { db } from '../firebase'
import { mapObjectToArray } from '../utils'
import { initProductSyns } from '../API/index'


const initialStateForSearchList = {
    products: [],
    imBusy: false,
    filteredListOfProduct: [],
    filters: {
        searchedProduct: '',
        optionDropMenu: 'every',
        caloriesSliderValue: 700,
    }
}


const TYPES = {
    SET = 'SET',
    MAXIMUM_VALUE_OF_CALORIES_SLIDER: 'MAXIMUM_VALUE_OF_CALORIES_SLIDER',

    PHRASE_OF_SEARCHING_TEXTFIELD: 'PHRASE_OF_SEARCHING_TEXTFIELD',
    VALUE_OF_CALORIES_SLIDER: 'VALUE_OF_CALORIES_SLIDER',
    OPTION_OF_DROPMENU: 'OPTION_OF_DROPMENU',

    FILTER_LIST: 'FILTER_LIST'
}
export const


const ACTIONS = {
    set: products => {
        return {
            type: SET,
            data: { 
                products
             }
        }
    },

    handleNewTextFieldValue: searchedProduct => {
        return {
            type: PHRASE_OF_SEARCHING_TEXTFIELD,
            data: {
                searchedProduct
            }
        }
    },
    handleChangeSliderValue: caloriesSliderValue => {
        return {
            type: VALUE_OF_CALORIES_SLIDER,
            data: {
                caloriesSliderValue
            }
        }
    },

    handleChangeOptionDropMenu: optionDropMenu => {
        return {
            type: OPTION_OF_DROPMENU,
            data: {
                optionDropMenu
            }
        }
    },
    initialGetFilteredList: (prop, val) => {
        return {
            type: FILTER_LIST,
            data: {
                [prop]: val
            }
        }
    },

}

const cf = (data, filters) => { // funkja filtrująca do logic.jss
    return data
}
export default function reducer(state = initialStateForSearchList, action) {

    // console.log('something changed', action, state)

    let newState = {}
    switch (action.type) {
        case SET:
            newState = { ...state, ...action.data }

        case TYPES.PHRASE_OF_SEARCHING_TEXTFIELD:
            newState = { ...state, ...action.data }
            break
        case TYPES.VALUE_OF_CALORIES_SLIDER:
            newState = { ...state, ...action.data }
            break
        case TYPES.OPTION_OF_DROPMENU:
            newState = { ...state, ...action.data }

            break
        case TYPES.FILTER_LIST:
            //

            const afs = {
                ...state.filters,
                ...action.data
            }


            const fd = cf(state.products, afs)
            newState = {
                ...state, filters: afs,
                filteredListOfProduct: fd
            }

            break

        default:
            newState = { ...state }
            break
    }

    //   console.log('after changes',newState)

    return newState
}


export {
    TYPES, ACTIONS
}