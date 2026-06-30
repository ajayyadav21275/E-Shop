const express = require("express");
const CartRouter = express.Router();

const {
  addToCart,getCart,removeFromCart,
  updateFromCartQuantity,
  } = require("../controller/cartController");

// CartRouter.get("/", (req, res) => {
//   res.json({ message: "Cart API is working", endpoints: [
//     "POST /web/cart/add",
//     "GET /web/cart/:user_id", 
//     "DELETE /web/cart/:id"
//   ]});
// });
CartRouter.post("/:user_id", addToCart);
CartRouter.get("/:user_id", getCart);
CartRouter.delete("/:id", removeFromCart);
CartRouter.put("/:id",updateFromCartQuantity )
module.exports = CartRouter;