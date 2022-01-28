import { createAction } from '@reduxjs/toolkit'
import { CartItem } from '../../types/item'

export const CURRENT_CART_ITEMS = '@CURRENT_CART_ITEMS'

export type ItemsState = CartItem[] | []

export const updateCartItemsAction = createAction<ItemsState>('@CURRENT_CART_ITEMS')
