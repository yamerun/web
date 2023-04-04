import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  items2: [],
  itemsbyEmoney: [],
  itemsbyEmoney2: [],
  filltered: [],
  filltered2: [],
  itemId: "",
  itemExchangeRates: [],
  exchangeId: "",
  exchange: "",
  item: "",
  variants: [],
  currentFrom: "",
  currentTo: "",
  Emoney: "",
  Emoney2: "",
  result: [],
  result2: [],
  statistics: [],
  calculated: [],
  loginStatus: "",
};

const itemsSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setItemsReducer(state, action) {
      state.items = action.payload;
    },
    setItems2Reducer(state, action) {
      state.items2 = action.payload;
    },
    setitemIdReducer(state, action) {
      state.itemId = action.payload;
    },
    setitemExchangeRatesReducer(state, action) {
      state.itemExchangeRates = action.payload;
    },
    setitemexchangeIdReducer(state, action) {
      state.exchangeId = action.payload;
    },
    setitemexchangeReducer(state, action) {
      state.exchange = action.payload;
    },
    setItemReducer(state, action) {
      state.item = action.payload;
    },
    setVariantsReducer(state, action) {
      state.variants = action.payload;
    },
    setFillterItemsToReducer(state, action) {
      state.variants = state.variants.filter((item) =>
        item.to.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },

    setCurrentItemFromReducer(state, action) {
      state.currentFrom = action.payload;
    },

    setCurrentItemToReducer(state, action) {
      state.currentTo = action.payload;
    },
    setFillterItemsReducer(state, action) {
      state.filltered = state.items.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setFillterItems2Reducer(state, action) {
      state.filltered2 = state.items2.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setEmoneyReducer(state, action) {
      state.Emoney = action.payload;
    },
    setEmoneyReducer2(state, action) {
      state.Emoney2 = action.payload;
    },

    setResult(state, action) {
      state.result = action.payload;
    },
    setResult2(state, action) {
      state.result2 = action.payload;
    },
    setStatistics(state, action) {
      state.statistics = action.payload;
    },
    setCalculated(state, action) {
      state.calculated = action.payload;
    },

    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
  },
});

export const {
  setItemsReducer,
  setItems2Reducer,
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
  setCurrentItemToReducer,
  setEmoneyReducer,
  setEmoneyReducer2,

  setResult,
  setResult2,
  setStatistics,
  setCalculated,
  setLoginStatus,
} = itemsSlice.actions;
export default itemsSlice.reducer;
