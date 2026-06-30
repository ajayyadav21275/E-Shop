import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/ProductSlice";
import cartReducer from "./slice/CartSlice";
import loginReducer from "./slice/LoginSlice";
import orderReducer from "./slice/orderSlice";
import addressReducer from "./slice/addressSlice"
import categoryReducer from "./slice/categorySlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: loginReducer,
    order: orderReducer,
    address:addressReducer,
    categories: categoryReducer
  },
});