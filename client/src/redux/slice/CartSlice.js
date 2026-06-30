import { createSlice } from "@reduxjs/toolkit";

import { addToCart, getCart, removeCart, updateCart } from "../../api/CartApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(addToCart.fulfilled, (state, action) => {
  
  state.cartItems.push(action.payload);
    });

    
    builder.addCase(getCart.fulfilled,(state,action)=>{
      
      state.cartItems=action.payload
    })

    builder.addCase(removeCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    })
    builder.addCase(updateCart.fulfilled,(state, action) => {
    
    const index = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );
    if (index !== -1) {
      state.cartItems[index] = action.payload;
    }}
);
  }
  
});

export default cartSlice.reducer;