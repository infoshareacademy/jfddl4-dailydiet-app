import {db} from '../firebase'
import { mapObjectToArray } from '../utils'

export const initProductSync = () => {

    return new Promise((resolve, reject)=>{
     db.ref('/products').on(
            'value',
            (snapshot) =>  
            resolve(mapObjectToArray(snapshot.val()))
                 
        )
    })}