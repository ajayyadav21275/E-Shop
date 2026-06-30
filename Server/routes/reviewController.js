const express = require("express");
const ReviewRouter = express.Router();
const {getReview} = require("../controller/reviewController");
const {addReview} = require("../controller/reviewController");
const {updateReview} = require("../controller/reviewController");
const {removeReview} = require("../controller/reviewController");
ReviewRouter.get("/",getReview);
ReviewRouter.post("/register",addReview);
ReviewRouter.put("/update/:id",updateReview);
ReviewRouter.delete("/remove/:id",removeReview);

module.exports = ReviewRouter;


