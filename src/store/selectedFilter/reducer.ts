import { AllItemsByCategories } from '../../types/categories'
import { selectedFilterAction } from './actions'
import * as rawOperations from './operations'
import { createReducer } from '@reduxjs/toolkit'
import { createUseStore } from '../../utils/createUseStore'

export type SelectedFilterState = {
  filter: keyof typeof AllItemsByCategories | null
}

const INITIAL_STATE: SelectedFilterState = {
  filter: null
}

export const selectedFilterReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(selectedFilterAction, (state, action) => {
      state.filter = action.payload
    })
})

export const useSelectedFilterStore = createUseStore<SelectedFilterState, typeof rawOperations>(rawOperations, 'selectedFilter')
