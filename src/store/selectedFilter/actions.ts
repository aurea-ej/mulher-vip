import { AllItemsByCategories } from '../../types/categories'
import { createAction } from '@reduxjs/toolkit'

export const SELECTED_FILTER = '@SELECTED_FILTER'

export type SelectedFilterState = keyof typeof AllItemsByCategories | null

export const selectedFilterAction = createAction<SelectedFilterState>('@SELECTED_FILTER')
