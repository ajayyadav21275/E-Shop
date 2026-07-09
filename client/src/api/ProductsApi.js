import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page = 1, search = "", categoryId = "" }) => {

    const categoryQuery = categoryId
      ? `&categoryId=${categoryId}`
      : "";

    const response = await Api.get(
      `/products?page=${page}&limit=12&search=${search}${categoryQuery}`
    );

  

    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id,category_id) => {
    if(id){
          const response = await Api.get(`/products/${id}`);
    return response.data;
    }
    else if(category_id){
      console.log("category:",category_id)
      const response = await Api.get(`/productDetails?categoryId=${category_id}`);
      return response.data;
    }
   
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    console.log("productData:",productData)
    const config = productData instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
    const response = await Api.post("/products/add", productData, config);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }) => {
    const response = await Api.delete(`/products/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    const res = await Api.put(`/products/${id}`, data);

    return res.data;
  }
);


