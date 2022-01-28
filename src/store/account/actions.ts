import { Account } from '../../types/user'
import { createAction } from '@reduxjs/toolkit'

export const ACCOUNT = '@ACCOUNT'

export type AccountState = Account | null

export const updateAccountAction = createAction<AccountState>('@ACCOUNT')
