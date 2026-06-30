const express = require("express");
const { getVariants, createVariants, updateVariants, deletevariants } = require("../controller/product_variants.Controller");
const variantsRouter = express.Router();

variantsRouter.get("/:id", getVariants);
variantsRouter.post("/add",createVariants);
variantsRouter.put("/update/:id",updateVariants);
variantsRouter.delete("/delete/:id",deletevariants);

module.exports = variantsRouter;