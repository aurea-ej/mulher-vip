import { createAction } from '@reduxjs/toolkit'

export const HAVE_FILTERED_ITEMS = '@HAVE_FILTERED_ITEMS'

export type HaveFilteredItemsState = boolean | null

export const updateHaveFilteredItemsAction = createAction<HaveFilteredItemsState>('@HAVE_FILTERED_ITEMS')
