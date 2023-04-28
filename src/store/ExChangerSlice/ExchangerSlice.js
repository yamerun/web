import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  markChange: "",
  scammerSearchIndex: 0,
};

const ExchangerSlice = createSlice({
  name: "echangerOptionsList",
  initialState,
  reducers: {
    setMarkChange(state, action) {
      state.markChange = action.payload;
    },
    setScammerSearchIndex(state, action) {
      state.scammerSearchIndex = action.payload;
    },
  },
});

export const { setMarkChange, setScammerSearchIndex } = ExchangerSlice.actions;
export default ExchangerSlice.reducer;
