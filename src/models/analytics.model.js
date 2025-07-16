/** @format */

const mongoose = require("mongoose");

const PlatformAnalyticsSchema = mongoose.Schema(
  {
    totalTasks: {
      type: Number,
      default: 0,
    },
    todo: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    done: {
      type: Number,
      default: 0,
    },
    block: {
      type: Number,
      default: 0,
    },
    delete: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", PlatformAnalyticsSchema);
