import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filltered: [],
  filltered2: [],
  itemId:'',
  itemExchangeRates:[],
  exchangeId:'',
  exchange:'',
  item:'',
  variants:[],
  currentFrom:'',
  currentTo:'',



};

const itemsSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setItemsReducer(state, action) {
      state.items = action.payload;
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
    setItemReducer(state, action) {
      state.item = action.payload
    },
    setVariantsReducer(state, action) {
      state.variants = action.payload
    },
    setFillterItemsToReducer(state, action) {
      state.variants = state.variants.filter((item) =>
        item.to.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },

    setCurrentItemFromReducer(state, action) {
     state.currentFrom = action.payload
    },
    
    setCurrentItemToReducer(state, action) {
      state.currentTo = action.payload
     },
     setFillterItemsReducer(state, action) {
      state.filltered = state.items.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setFillterItems2Reducer(state, action) {
      state.filltered2 = state.items.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
  },
});

export const {
  setItemsReducer,
  setFillterItemsReducer,
  setFillterItems2Reducer,
  setitemIdReducer,
  setitemExchangeRatesReducer,
  setitemexchangeIdReducer,
  setitemexchangeReducer,
  setItemReducer,
  setVariantsReducer,
  setFillterItemsToReducer,
  setCurrentItemFromReducer,
  setCurrentItemToReducer
} = itemsSlice.actions;
export default itemsSlice.reducer;
