import { Item } from '../types/item'
import { app } from '../FIREBASECONFIG.js'
import { getDatabase, ref, onValue } from 'firebase/database'

const db = getDatabase(app)

export const getProducts = (updateItems: (items: Item[]) => void) => {
  const productsRef = ref(db, 'products/')
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val() as Item[]
    var items = Object.keys(data).map((key: any) => data[key])
    if(items.length > 0 ) {
      updateItems(items)
    }
  })

}