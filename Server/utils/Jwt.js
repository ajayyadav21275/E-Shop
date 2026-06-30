const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "secretKey";

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    {
      expiresIn: "15m",
    }
  );
};

module.exports = { generateToken };