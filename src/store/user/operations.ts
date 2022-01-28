import { Dispatch } from 'redux'
import { User } from '../../types/user'
import { updateUserAction } from './actions'

export const updateUser = (dispatch: Dispatch) => (user: User) => {
  dispatch(updateUserAction(user))
}

export const resetUser = (dispatch: Dispatch) => () => {
  dispatch(updateUserAction(null))
}
