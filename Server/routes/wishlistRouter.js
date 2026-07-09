let express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/wishlistController");
let WishlistRouter = express.Router();


 
  WishlistRouter.post("/add/:productId",addToWishlist  );
  WishlistRouter.get("/",getWishlist );
  WishlistRouter.delete("/remove/:id",removeFromWishlist );

  module.exports = WishlistRouter; 