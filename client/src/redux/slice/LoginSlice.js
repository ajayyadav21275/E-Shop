import { createSlice } from "@reduxjs/toolkit";
import { logIn, registerUser } from "../../api/LoginApi";

const userLogIn = createSlice({
  name: "user",

  initialState: {
    user: null,
    token: null,
  },

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logoutUser } = userLogIn.actions;

export default userLogIn.reducer;