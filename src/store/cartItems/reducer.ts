import { CartItem } from '../../types/item'
import * as rawOperations from './operations'
import { updateCartItemsAction } from './actions'
import { createReducer } from '@reduxjs/toolkit'
import { createUseStore } from '../../utils/createUseStore'

export type CartItemsState = {
  CartItems: CartItem[] | []
}

const INITIAL_STATE: CartItemsState = {
  CartItems: []
}

export const CartItemsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateCartItemsAction, (state, action) => {
      state.CartItems = action.payload
    })
})

export const useCartItemsStore = createUseStore<CartItemsState, typeof rawOperations>(rawOperations, 'cartItems')
