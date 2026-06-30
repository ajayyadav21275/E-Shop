import { createSlice } from "@reduxjs/toolkit";
import { addAddress, getAdders } from "../../api/addressApi";

const addressSlice = createSlice({
  name: "address",

  initialState: {
    addresses: [],
    loading: false,
    error: null,
    selectedAddress: null,
  },

  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },

  extraReducers: (builder) => {

    // ---------------- ADD ADDRESS ----------------
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;

        // new address add to list
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder.addCase(getAdders.fulfilled,(state,action)=>{
        state.address = action.payload
      });

  },
});

export const { setSelectedAddress } = addressSlice.actions;

export default addressSlice.reducer;