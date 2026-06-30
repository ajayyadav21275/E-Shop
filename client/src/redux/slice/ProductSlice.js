import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
} from "../../api/ProductsApi";

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    product: null,
    search: "",
    page: 1,
    totalPages: 0,
    totalProducts: 0,
    loading: false,
    error: null,
  },

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.totalProducts = action.payload.totalProducts;
    });

    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload.product;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.unshift(action.payload.product);
    });
    builder.addCase(updateProduct.fulfilled,(state,action)=>{
      state.product= action.payload
    })
  },
});

export const { setSearch, setPage } = productSlice.actions;

export default productSlice.reducer;