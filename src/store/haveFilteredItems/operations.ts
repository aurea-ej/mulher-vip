import { Dispatch } from 'redux'
import { updateHaveFilteredItemsAction } from './actions'

export const updateHaveFilteredItems = (dispatch: Dispatch) => (option: boolean) => {
  dispatch(updateHaveFilteredItemsAction(option))
}
