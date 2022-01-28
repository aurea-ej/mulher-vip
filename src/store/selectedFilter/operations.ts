import { Dispatch } from 'redux'
import { AllItemsByCategories } from '../../types/categories'
import { selectedFilterAction } from './actions'

export const updateSelectedFilter = (dispatch: Dispatch) => (filter: keyof typeof AllItemsByCategories) => {
  dispatch(selectedFilterAction(filter))
}

export const resetSelectedFilter = (dispatch: Dispatch) => () => {
  dispatch(selectedFilterAction(null))
}
