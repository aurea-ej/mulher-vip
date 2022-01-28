import { Dispatch } from 'redux'
import { Account } from '../../types/user'
import { updateAccountAction } from './actions'

export const updateAccount = (dispatch: Dispatch) => (user: Account) => {
  dispatch(updateAccountAction(user))
}

export const resetAccount = (dispatch: Dispatch) => () => {
  dispatch(updateAccountAction(null))
}
