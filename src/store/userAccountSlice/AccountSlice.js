import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: '',
  password: '',
};

const AccountSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const { setLogin,setPassword } = AccountSlice.actions;
export default AccountSlice.reducer;
