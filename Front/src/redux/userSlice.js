import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

const initialState = {
  user: null,
  isAuthenticating: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticating = true;
      Cookies.set("user", JSON.stringify(action.payload), {
        expires: 7,
        path: "/",
      }); // Set a 7-day expiration (adjust as needed)
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticating = false;
      Cookies.remove("user"); // Remove the user cookie
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;