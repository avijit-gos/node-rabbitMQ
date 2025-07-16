/** @format */

const {
  createNewTask,
  updateTaskStatus,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.post("/", createNewTask);
router.patch("/update-status/:id", updateTaskStatus);
module.exports = router;
