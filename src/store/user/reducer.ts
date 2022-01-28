import { User } from '../../types/user'
import { updateUserAction } from './actions'
import * as rawOperations from './operations'
import { createReducer } from '@reduxjs/toolkit'
import { createUseStore } from '../../utils/createUseStore'

export type UserState = {
  user: User | null
}

const INITIAL_STATE: UserState = {
  user: null
}

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateUserAction, (state, action) => {
      state.user = action.payload
    })
})

export const useUserStore = createUseStore<UserState, typeof rawOperations>(rawOperations, 'user')
