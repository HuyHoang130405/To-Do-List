const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 50 },
    description: { type: String, trim: true, maxlength: 100 },
    priority: { type: String, enum: ["low", "medium", "high"], default: "Medium" },
    startTime: { type: Date },
    endTime: {
      type: Date,
      validate: {
        validator: function (value) {
          // chỉ validate nếu có startTime
          return !this.startTime || value >= this.startTime;
        },
        message: "End time must be greater than or equal to start time",
      },
    },
    subtasks: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        done: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
