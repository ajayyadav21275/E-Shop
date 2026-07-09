const express = require("express");
const ProductRouter = express.Router();

const { getProducts, getProductById, createProduct, DeleteProduct, updateProducts } = require("../controller/productController");
const { upload } = require("../multer/uploads");


ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/add", upload.single("image"), createProduct);
ProductRouter.delete("/:id", DeleteProduct);
ProductRouter.put("/:id",upload.single("image"), updateProducts )

module.exports = ProductRouter;