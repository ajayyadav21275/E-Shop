let express = require("express");
let WishlistRouter = express.Router();


 let {AddToWishlist, RemoveFromWishlist, GetWishlist} = require("../controller/WishlistController");
  WishlistRouter.post("/add/:productId", AddToWishlist);
  WishlistRouter.get("/", GetWishlist);
  WishlistRouter.delete("/remove/:id", RemoveFromWishlist);

  module.exports = WishlistRouter; 