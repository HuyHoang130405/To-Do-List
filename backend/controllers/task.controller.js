const Task = require("../models/task.model");

// Tạo task
const createTask = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Người dùng chưa được xác thực" });
    }

    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả task của user
const getTasks = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Người dùng chưa được xác thực" });
    }

    const tasks = await Task.find({ user: req.user.id }).sort({createdAt: -1});
    res.json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

// Cập nhật task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, // chỉ update task thuộc về user này
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy task hoặc bạn không có quyền" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Xóa task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy task hoặc bạn không có quyền" });
    }

    res.json({ message: "Xóa task thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
