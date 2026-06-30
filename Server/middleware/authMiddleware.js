const jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        message: "No token provided",
      });
    }

    token = token.split(" ")[1];

    const secret = process.env.JWT_SECRE;
    let decode = jwt.verify(token, secret);

    req.user = decode;

    next();

  } catch (error) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }
};

module.exports = { auth };