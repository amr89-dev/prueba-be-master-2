require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const sign = (payload, isAccessToken) => {
  return jwt.sign(payload, isAccessToken ? JWT_SECRET : JWT_REFRESH_SECRET, {
    expiresIn: isAccessToken ? "15m" : "7d",
  });
};

const generateAccessToken = (payload) => sign(payload, true);
const generateRefreshToken = (payload) => sign(payload, false);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
