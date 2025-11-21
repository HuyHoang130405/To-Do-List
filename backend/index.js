const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
app.set("trust proxy", 1);
// Thêm cấu hình CORS
app.use(cors({
    origin: "https://huyhoang-todolist.vercel.app", // Cho phép frontend truy cập
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Cho phép gửi cookie
}));
app.options("*", cors({
    origin: "https://huyhoang-todolist.vercel.app",
    credentials: true
})); // <- BẮT BUỘC CHO CHROME MOBILE
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/tasks", require("./routes/task"));


// Error handler middleware
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
