import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  password: "",
  email: "",
  verifiedPassword: "",
  name: "",
  emailLogin: "",
  passwordLogin: "",
  isExchangerRole:false,
};

const AccountSlice = createSlice({
  name: "userOptionsList",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setverifiedPassword(state, action) {
      state.verifiedPassword = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setLoginPassword(state, action) {
      state.passwordLogin = action.payload;
    },
    setLoginEmail(state, action) {
      state.emailLogin = action.payload;
    },
    setUserRole(state,action) {
      state.isExchangerRole = action.payload;
    }
  },
});

export const {
  setLogin,
  setPassword,
  setEmail,
  setverifiedPassword,
  setName,
  setLoginPassword,
  setLoginEmail,
  setUserRole
} = AccountSlice.actions;
export default AccountSlice.reducer;
