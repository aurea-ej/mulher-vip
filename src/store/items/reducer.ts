import { Item } from '../../types/item'
import * as rawOperations from './operations'
import { updateItemsAction } from './actions'
import { createReducer } from '@reduxjs/toolkit'
import { createUseStore } from '../../utils/createUseStore'

export type ItemsState = {
  items: Item[] | []
}

const INITIAL_STATE: ItemsState = {
  items: []
}

export const ItemsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateItemsAction, (state, action) => {
      state.items = action.payload
    })
})

export const useItemsStore = createUseStore<ItemsState, typeof rawOperations>(rawOperations, 'items')
