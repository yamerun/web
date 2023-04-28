import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './itemsSlice/itemsSlice'
import AccountSlice from './userAccountSlice/AccountSlice'
import ExchangerSlice from './ExChangerSlice/ExchangerSlice'
export const store = configureStore({
  reducer: {
    itemsSlice,
    AccountSlice,
    ExchangerSlice
  }
})