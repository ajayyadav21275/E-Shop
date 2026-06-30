const express = require("express");
const AuthRouter = express.Router();

const { register, login } = require("../controller/authController");

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

module.exports = AuthRouter;