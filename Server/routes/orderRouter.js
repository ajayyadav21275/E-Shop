const express = require("express");
const OrderRouter = express.Router();

const { getOrders, DeleteOrder, createOrder, getOrderById, getAllOrders, updateOrderStatus } = require("../controller/ordersController");

OrderRouter.post("/create", createOrder);
OrderRouter.get("/user/:user_id", getOrders);
OrderRouter.get("/:order_id",getOrderById )
OrderRouter.delete("/delete/:id", DeleteOrder);

// Admin Api //
OrderRouter.get("/",getAllOrders );
OrderRouter.put("/:id",updateOrderStatus);
module.exports = OrderRouter;