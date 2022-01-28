import { Account } from '../../types/user'
import { updateAccountAction } from './actions'
import * as rawOperations from './operations'
import { createReducer } from '@reduxjs/toolkit'
import { createUseStore } from '../../utils/createUseStore'

export type AccountState = {
  account: Account | null
}

const INITIAL_STATE: AccountState = {
  account: null
}

export const accountReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateAccountAction, (state, action) => {
      state.account = action.payload
    })
})

export const useAccountStore = createUseStore<AccountState, typeof rawOperations>(rawOperations, 'account')
