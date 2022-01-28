
import firebase from 'firebase/compat/app'

export const firebaseConfig = {
  apiKey: 'AIzaSyA3XP2A-bfyoAaLcHa1csfecit6izqAdb0',
  authDomain: 'mulhervipcampos.firebaseapp.com',
  databaseURL: 'https://mulhervipcampos-default-rtdb.firebaseio.com',
  projectId: 'mulhervipcampos',
  storageBucket: 'mulhervipcampos.appspot.com',
  messagingSenderId: '996946008611',
  appId: '1:996946008611:web:0f1664695f0cefae8f2f96',
  measurementId: 'G-DG0VYZC27B',
}

export const app = firebase.initializeApp(firebaseConfig)

// var storage = firebase.storage()
