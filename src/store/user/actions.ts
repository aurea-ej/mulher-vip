import { User } from '../../types/user'
import { createAction } from '@reduxjs/toolkit'

export const USER = '@USER'

export type UserState = User | null

export const updateUserAction = createAction<UserState>('@USER')
