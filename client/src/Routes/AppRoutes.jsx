import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Product from "../pages/Product";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import CheckOut from "../pages/CheckOut";
import OrderHistory from "../pages/OrderHistory";
import OrderDetails from "../pages/OrderDetails";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashbord from "../admin/adminPages/AdminDashbord";
import AdminOrders from "../admin/adminPages/AdminOrders";
import AdminProducts from "../admin/adminPages/AdminProducts";
import AdminOrderDateils from "../admin/adminPages/adminComponents/AdminOrderDateils";
import AdminCategoryList from "../admin/categories/AdminCategoryList";



const AppRoutes = () => {

  return (

    <Routes>
      

      <Route path="/" element={<Home />} />

      <Route path="/product" element={<Product />} />

      <Route path="/product/:parentId" element={<Product />} />

        <Route path="/productDetails/:category_id" element={<ProductDetails />} />
      

      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/productDetails/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/checkOut"
        element={<CheckOut />}
      />

      <Route
        path="/orders"
        element={<OrderHistory />}
      />

      <Route
        path="/orderDetails/:orderId"
        element={<OrderDetails />}
      />

      {/* ADMIN ROUTES */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<AdminDashbord/>}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />
        <Route path="orderDetails/:orderId" element ={<AdminOrderDateils/>} />
       <Route path = "category" element={<AdminCategoryList/>} />
      </Route>

    </Routes>

  );

};

export default AppRoutes;