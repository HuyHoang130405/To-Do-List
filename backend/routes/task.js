const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask} = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, createTask);
router.get("/get", authMiddleware, getTasks);
router.put("/update/:id", authMiddleware, updateTask); 
router.delete("/delete/:id", authMiddleware, deleteTask);

module.exports = router;
