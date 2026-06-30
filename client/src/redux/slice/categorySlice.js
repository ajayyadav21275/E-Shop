import { createSlice } from "@reduxjs/toolkit";
import { categoryUpdate, getCategories, getCategoryById } from "../../api/categoryApi";

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        category: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.category = action.payload;
            })
             .addCase(categoryUpdate.fulfilled, (state, action) => {
                state.category = action.payload;
            });
    },
});

export default categorySlice.reducer;