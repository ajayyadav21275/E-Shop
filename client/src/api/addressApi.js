import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  
  async (addressData, { rejectWithValue }) => {
    
    
    try {
        const token = localStorage.getItem("token")
      const result = await Api.post("/address/add", addressData,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
      );
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAdders = createAsyncThunk("address/getAdders", async()=>{
  const result = await Api.get("/address/user_Id")
  return result.data;
})