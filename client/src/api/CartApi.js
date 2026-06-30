import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity = 1 }) => {
    const response = await Api.post(`/cart/${userId}`, {
      product_id: productId,
      quantity,
    });

    return response.data;
    
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  const res = await Api.get(`/cart/${userId}`);
  return res.data;
});

export const removeCart = createAsyncThunk("cart/removeCart", async (id)=>{
  const res = await Api.delete(`/cart/${id}`);
  return id;
})

export const updateCart = createAsyncThunk("cart/updateCart", async (data)=>{
  const res = await Api.put(`/cart/${data.id}`,{
    quantity:data.quantity
  });

  return res.data;
})