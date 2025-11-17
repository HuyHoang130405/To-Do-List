// index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

// Middleware CORS chuẩn cho frontend và preflight requests
app.use((req, res, next) => {
    const allowedOrigins = [
        "http://localhost:3000",
        "https://huyhoang-todolist.vercel.app",
        "https://to-do-list-seven-gamma-80.vercel.app"
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization"
    );

    // Nếu là preflight request thì trả luôn 200
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

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
