import { createAction } from '@reduxjs/toolkit'
import { Item } from '../../types/item'

export const CURRENT_ITEMS = '@ITEMS'

export type ItemsState = Item[] | []

export const updateItemsAction = createAction<ItemsState>('@ITEMS')
