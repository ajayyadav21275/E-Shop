import { createSlice } from "@reduxjs/toolkit";
import {
  getOrder,
  addToOrder,
  getOrderById,
  getAdminOrder,
  updateOrder,
  razorpayOrder,
  deleteOrder
  
} from "../../api/orderApi";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
    currentOrder: null,
    adminOrders: [],
    razorpayOrder: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // ---------------- CREATE ORDER ----------------
    builder
      .addCase(addToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(addToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- CREATE RAZORPAY ORDER ----------------
    builder
      .addCase(razorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(razorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload.order;
      })
      .addCase(razorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- USER ORDERS ----------------
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- ORDER BY ID ----------------
    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- ADMIN ORDERS ----------------
    builder
      .addCase(getAdminOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
      })
      .addCase(getAdminOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- UPDATE ORDER ----------------
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      const order = state.adminOrders.find(
        (item) => item.id === action.payload.id
      );

      if (order) {
        order.status = action.payload.status;
      }
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
  state.adminOrders = state.adminOrders.filter(
    (item) => item.id !== action.payload.data.id
  );
});
    
  },
});

export default orderSlice.reducer;