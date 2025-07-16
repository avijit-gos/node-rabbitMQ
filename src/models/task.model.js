/** @format */

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: ["block", "todo", "progress", "done", "delete"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
