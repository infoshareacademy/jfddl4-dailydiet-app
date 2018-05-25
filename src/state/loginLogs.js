import {auth, db, GoogleProvider} from '../firebase'
import moment from "moment/moment";


const UPDATE_LOGINS = 'countLogins/UPDATE_LOGINS'

export const mapObjectToArray = (obj) => (
    Object.entries(obj || {})
        .map(([key, value]) => (
            typeof value === 'object' ?
                {...value, key}
                :
                {key, value}
        ))
)

export const updateLogins = (newValue) => ({
    type: UPDATE_LOGINS,
    newValue
})

export const logInsSyncer = () => (dispatch, getState) => {
    const userUid = getState().auth.user.uid
    db.ref(`/users/${userUid}/loginsLogs/`).on(
        'value',
        (snapshot) => dispatch(
            updateLogins(mapObjectToArray(snapshot.val() || []))
        )
    )
}

const initialState = {
    loginsNumber: []
}

const sevendays = 1000 * 60 * 60 * 24 * 7;

export default (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_LOGINS:

            let splitByDays = [];
            let splitByDaysCounter = [];


            let daysOfLog = action.newValue
                .map(login =>  login.timestamp )

            const    last = daysOfLog[daysOfLog.length-1]
            const    sevendaysbefore = last - sevendays;

            daysOfLog = daysOfLog.filter((e)=> (e > sevendaysbefore) )
                .map((e)=>moment(e).format('DD.MM.YYYY'))
                .map((e,k)=>{
                    if(!splitByDays.includes(e)){
                        splitByDays.push(e)
                    }
                return e;

            })


            daysOfLog.map((e)=>{
                const _i = splitByDays.indexOf(e);

                if(!splitByDaysCounter[_i]){
                    splitByDaysCounter[_i] = 1
                }
                else{
                    splitByDaysCounter[_i]++

                }
            })

            splitByDays = splitByDays.map((e,k)=>{

                return {
                    day:e,
                    logs:splitByDaysCounter[k]
                }
            })

            return {
                ...state,
                loginsNumber: action.newValue,
                arrayOfTimestamps: splitByDays
            }

        default:
            return state
    }
}
