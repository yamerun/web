import { createSlice } from "@reduxjs/toolkit";

const initialState = {
markChange:'',


};

const exchangerSlice = createSlice({

setMarkChange(state,action) {
state.markChange = action.payload;
}
});

export const  {
    setMarkChange
                              
} = exchangerSlice.actions;
export default itemsSlice.reducer;
