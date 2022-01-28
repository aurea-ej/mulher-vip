import { Dispatch } from 'redux'
import { Item } from '../../types/item'
import { updateItemsAction } from './actions'

export const updateItems = (dispatch: Dispatch) => (items: Item[]) => {
  dispatch(updateItemsAction(items))
}

export const resetItems = (dispatch: Dispatch) => () => {
  dispatch(updateItemsAction([]))
}
