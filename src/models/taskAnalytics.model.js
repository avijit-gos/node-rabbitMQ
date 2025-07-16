/** @format */

const mongoose = require("mongoose");

const TaskAnalyticsSchema = mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    eventType: {
      type: String,
      enum: ["created", "updated", "deleted", "statusChanged"],
      required: true,
    },
    oldStatus: {
      type: String,
      enum: ["block", "todo", "progress", "done", null],
      default: null,
    },
    newStatus: {
      type: String,
      enum: ["block", "todo", "progress", "done", null],
      default: null,
    },
    // changedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // assuming you have a User model
    //   default: null,
    // },
    description: {
      type: String,
      default: "",
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskAnalytics", TaskAnalyticsSchema);
