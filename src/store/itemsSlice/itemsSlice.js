import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filltered: [],
  itemId:'',
  itemExchangeRates:[],
  exchangeId:'',
  exchange:'',


};

const itemsSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setItemsReducer(state, action) {
      state.items = action.payload;
    },
    setFillterItemsReducer(state, action) {
      state.filltered = state.items.filter((item) =>
        item.from.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setitemIdReducer(state, action) {
      state.itemId = action.payload 
    },
    setitemExchangeRatesReducer(state, action) {
      state.itemExchangeRates = action.payload 
    },
    setitemexchangeIdReducer(state, action) {
      state.exchangeId = action.payload
    },   
    setitemexchangeReducer(state, action) {
      state.exchange = action.payload
    },
  },
});

export const {
  setItemsReducer,
  setFillterItemsReducer,
  setitemIdReducer,
  setitemExchangeRatesReducer,
  setitemexchangeIdReducer,
  setitemexchangeReducer
} = itemsSlice.actions;
export default itemsSlice.reducer;
