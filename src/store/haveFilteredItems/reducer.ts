import * as rawOperations from './operations'
import { createReducer } from '@reduxjs/toolkit'
import { updateHaveFilteredItemsAction } from './actions'
import { createUseStore } from '../../utils/createUseStore'

export type HaveFilteredItemsState = {
  haveFilteredItems: boolean | null
}

const INITIAL_STATE: HaveFilteredItemsState = {
  haveFilteredItems: true
}

export const haveFilteredItemsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateHaveFilteredItemsAction, (state, action) => {
      state.haveFilteredItems = action.payload
    })
})

export const useHaveFilteredItemsStore = createUseStore<HaveFilteredItemsState, typeof rawOperations>(rawOperations, 'haveFilteredItems')
