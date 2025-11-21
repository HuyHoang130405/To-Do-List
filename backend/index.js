const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

// Quan trọng trên Render
app.set("trust proxy", 1);

/* ---------------------- FIX CORS CHUẨN 100% ---------------------- */
const allowedOrigin = "https://huyhoang-todolist.vercel.app";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Chrome mobile yêu cầu cái này để pass preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
/* --------------------------------------------------------------- */

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/tasks", require("./routes/task"));

// Error handler
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy trên port ${PORT}`));
