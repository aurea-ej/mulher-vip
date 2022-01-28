import { Account } from '../types/user'
import { app } from '../FIREBASECONFIG.js'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

const auth = getAuth()
const db = getDatabase(app)

export const getUserInfos = (updateAccount: (user: Account) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userInfosRef = ref(db, 'userInfo/' + user.uid)
      onValue(userInfosRef, (snapshot) => {
        const data = snapshot.val() as Account
        if(data){
          updateAccount(data)
        }
      })
    }
  })
}