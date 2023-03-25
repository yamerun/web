import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './itemsSlice/itemsSlice'
import AccountSlice from './userAccountSlice/AccountSlice'
export const store = configureStore({
  reducer: {
    itemsSlice,
    AccountSlice
  }
})