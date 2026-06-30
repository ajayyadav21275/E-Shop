import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../axios/Api";
import { data } from "react-router-dom";


export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await Api.get('/categories');
    const data = response.data;
    return data;
  }
);


export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  console.log("category_name:",name),
  async (id) => {
   
    const response = await Api.get(`/categories/${id}`);
    const data = response.data;
    c
    return data;
  }
);

// Admin Create Category Api //
export const addCategory = createAsyncThunk("categories/addCategory",
   async(data)=>{
    
   const res = Api.post("/categories/register",data);
   return res.data
})
 //   delete Api //

export const deleteCategory = createAsyncThunk("categories,deleteCategory", 
  async(id)=>{
    console.log("category:",id)
   const res = Api.delete(`/categories/del/${id}`);
   return res.data
  }
)

export const categoryUpdate = createAsyncThunk("categories,categoryUpdate",
  async({id,data})=>{
    
    const res = await Api.put(`/categories/update/${id}`,data)
    return res.data;
  }
)