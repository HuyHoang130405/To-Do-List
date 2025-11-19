const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
// Thêm cấu hình CORS
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://huyhoang-todolist.vercel.app"
    ], // Cho phép frontend truy cập
    credentials: true, // Cho phép gửi cookie
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức được phép
    allowedHeaders: ['Content-Type', 'Authorization'] // Các header được phép
}));
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
