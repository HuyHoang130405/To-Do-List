const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

let refreshTokens = []; // (tuỳ bạn có thể lưu DB hoặc Redis)

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate username
    if (!username || username.length < 3 || username.length > 30) {
      return res
        .status(400)
        .json({ message: "Username phải từ 3 đến 30 ký tự" });
    }

    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }

    // Validate password
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(password)) {
      return res.status(400).json({
        message:
          "Mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ và số",
      });
    }

    // Check trùng email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Hash password và lưu
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Đăng ký tài khoản thành công" });
  } catch (error) {
    if (error.code === 11000) {
      // lỗi unique trùng email/username
      return res
        .status(400)
        .json({ message: "Username hoặc Email đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Đăng nhập thành công",
            accessToken,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
    }
};

const refresh = (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) return res.status(401).json({ message: "Không tìm thấy refresh token" });

        const { id } = jwt.verify(token, process.env.REFRESH_SECRET);
        const newAccessToken = generateAccessToken(id);
        res.json({ message: "Cấp mới access token thành công", accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }
};
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};
const logout = (req, res) => {
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.json({ message: "Đăng xuất thành công" });
};

module.exports = { register, login, refresh, logout, getMe };
