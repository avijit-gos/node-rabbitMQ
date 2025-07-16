/** @format */

const mongoose = require("mongoose");
const Task = require("../models/task.model");
const createError = require("http-errors");
const analyticsProducer = require("../rabbitmq/producers/analytics.producer");

class TaskController {
  constructor() {}

  async createNewTask(req, res) {
    try {
      const newTask = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.title,
      });
      const task = await newTask.save();
      await analyticsProducer({ status: task.status });
      return res
        .status(201)
        .json({ message: "A new task has been created", status: 201, task });
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async updateTaskStatus(req, res) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("No task id found");
      }
      const task = await Task.findById(req.params.id).select("status");
      if (!task) throw createError.BadRequest("No task data found");

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );

      await analyticsProducer({
        previousStatus: task.status,
        status: updatedTask.status,
      });

      return res.status(200).json({
        message: "Task status has been updated",
        status: 200,
        task: updatedTask,
      });
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new TaskController();
