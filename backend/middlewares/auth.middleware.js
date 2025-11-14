const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Bạn cần đăng nhập để thực hiện hành động này!" });

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!" });

    req.user = decoded; // decoded phải chứa id của user
    next();
  });
};

module.exports = authMiddleware; // export function trực tiếp, không dùng {}
