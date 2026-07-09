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
  "categories/getCategoryById",
  async ({ parentId, page = 1, search = "" }, { rejectWithValue }) => {
    try {
      

      const response = await Api.get(
        `/categories/${parentId}?page=${page}&limit=12&search=${search}`
      );

    

      return response.data;
    } catch (err) {
      console.log("API Error:", err.response || err);
      return rejectWithValue(err.response?.data || err.message);
    }
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