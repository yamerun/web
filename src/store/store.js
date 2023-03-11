import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './itemsSlice/itemsSlice'

export const store = configureStore({
  reducer: {
    itemsSlice
  }
})