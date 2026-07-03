import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";

// CREATE ORDER
export const addToOrder = createAsyncThunk(
  "order/addToOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const result = await Api.post("/order/create", orderData,
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
 // RAZORPAY ORDER//
export const razorpayOrder = createAsyncThunk(
  "order/razorpayOrder",
  async (total, { rejectWithValue }) => {
    try {
      const res = await Api.post(
        "/order/createRazorpayOrder",
        {
          total: total,
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// VERIFY PAYMENT //

export const razorpayVerifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await Api.post(
        "/order/verifyPayment",
        paymentData
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
  // get order//
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (user_id) => {
    
      const result = await Api.get(`/order/user/${user_id}`);
      return result.data;  
    
  }
);
  // get order by id //
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (order_id, { rejectWithValue }) => {
    try {
      const result = await Api.get(`/order/${order_id}`);
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Admin Api //
export const getAdminOrder = createAsyncThunk(
  "order/getAdminOrder",
  async () => {
    
      const result = await Api.get("/order");
      return result.data;  
      
  }
);
  // Admin update order status //

 export const updateOrder = createAsyncThunk(

  "order/updateOrder",

  async ({ id, status }) => {

    const res = await Api.put(
      `/order/${id}`,
      { status }
    );

    return res.data;
    
  }

);

export const deleteOrder = createAsyncThunk("/order/deleteOrder",
  async (id) => {
   
      const res = await Api.delete(`/order/delete/${id}`);
      return res.data;
    
  
    })

