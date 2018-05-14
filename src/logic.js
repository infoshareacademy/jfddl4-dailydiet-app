// Firebase
import { db } from './firebase'

const readFromDatabase = (setArrayToState) => {
    db.ref(`/products`)
      .on(
        'value',
        (snapshot) => {
          const dataInArray =
            (Object.entries(snapshot.val() || {})
              .map(([key, value]) => (
                typeof value === 'object' ?
                  { ...value, key }
                  :
                  { key, value }
              ))
            )
          setArrayToState(dataInArray)
        })
}

export default readFromDatabase
