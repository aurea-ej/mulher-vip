import { Dispatch } from 'redux'
import { updateCartItemsAction } from './actions'
import { CartItem } from '../../types/item'

export const updateCartItems = (dispatch: Dispatch) => (items: CartItem[]) => {
  dispatch(updateCartItemsAction(items))
}

export const resetCartItems = (dispatch: Dispatch) => () => {
  dispatch(updateCartItemsAction([]))
}
