import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import { UserState, userReducer } from './user/reducer'
import { ItemsState, ItemsReducer } from './items/reducer'
import { AccountState, accountReducer } from './account/reducer'
import { CartItemsState, CartItemsReducer } from './cartItems/reducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { SelectedFilterState, selectedFilterReducer } from './selectedFilter/reducer'
import { HaveFilteredItemsState, haveFilteredItemsReducer } from './haveFilteredItems/reducer'

export interface ReduxState {
  user: UserState
  items: ItemsState
  account: AccountState
  cartItems: CartItemsState
  selectedFilter: SelectedFilterState
  haveFilteredItems: HaveFilteredItemsState
}

const rootReducer = combineReducers<ReduxState>({
  user: userReducer,
  items: ItemsReducer,
  account: accountReducer,
  cartItems :CartItemsReducer,
  selectedFilter: selectedFilterReducer,
  haveFilteredItems: haveFilteredItemsReducer,
})

const middlewares = []

middlewares.push(reduxThunk)

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
