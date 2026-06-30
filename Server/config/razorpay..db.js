const Rezorpay = require("razorpay");
require("dotenv").config();

const rezorpay = new Rezorpay({
 key_id: process.env.REZORPAY_KEY_ID,
 key_secret:process.env.RAZORPAY_KEY_SECRET
})