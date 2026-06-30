import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";

export const logIn = createAsyncThunk(
  "userLogIn/logIn",
  async ({ email, password }) => {
    const res = await Api.post("/login", {
      email,
      password,
    });

     
    localStorage.setItem("userINFO", JSON.stringify(res.data.user));
    localStorage.setItem("userId", String(res.data.user?.id ?? ""));
    localStorage.setItem("token", res.data.token);
     
    return res.data;
  });

  export const registerUser = createAsyncThunk("userRegister/register", 
    async (data) => {
     const res = await Api.post("/register",data);
     return res.data;
     console.log(res.data)

  })