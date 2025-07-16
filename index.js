/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const mqInit = require("./src/rabbitmq/mqInit");
require("./src/configs/mongo.config");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/tasks", require("./src/routes/task.router"));

// If route not found
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});
// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 3040;

app.listen(port, async () => {
  // mqInit();
  console.log(`Server listening on ${port}`);
});
