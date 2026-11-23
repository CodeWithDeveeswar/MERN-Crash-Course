import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userData")) || null;

const initialState = {
  userData,
  isLoggedIn: !!userData,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.clear("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
