const jwt = require("jsonwebtoken");

// Tạo Access Token (hết hạn ngắn, ví dụ 15 phút)
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// Tạo Refresh Token (hết hạn dài, ví dụ 7 ngày)
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
