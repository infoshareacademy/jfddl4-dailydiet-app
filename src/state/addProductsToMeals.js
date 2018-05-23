import {auth, db, GoogleProvider} from '../firebase'
import moment from "moment/moment";


export const addProductToMeal = (myProduct) => (dispatch, getState) => {
    const todaysDate = (moment(Date.now()).format('DD-MM-YYYY'))
    const userUid = getState().auth.user.uid
    const productKey = myProduct
    const newProductToMeal = db.ref(`/users/${userUid}/meals/${todaysDate}`).push()

    newProductToMeal.set({
        meal: productKey
    }).then(alert(`${productKey}' was succesfully added to your calendar`))
}
