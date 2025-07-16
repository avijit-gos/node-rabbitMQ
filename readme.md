<!-- @format -->

# Platform Analytics Service (RabbitMQ + MongoDB)

This service is designed to collect and update task-related platform analytics using **RabbitMQ** for messaging and **MongoDB** for storage.

Whenever a task status (e.g., `todo`, `progress`, `done`, etc.) is pushed into a queue, the consumer listens for messages, parses them, and updates an aggregated analytics document accordingly in MongoDB.

---

## Features

- Real-time updates for task analytics
- RabbitMQ consumer with message acknowledgment
- MongoDB integration with atomic `$inc` operations
- Auto-create analytics document using `upsert`
- Tracks: `todo`, `progress`, `done`, `block`, `delete`, and `totalTasks`

---

## Technologies Used

- [Node.js](https://nodejs.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [amqplib](https://www.npmjs.com/package/amqplib)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Setup Instructions

* MONGO_URI=mongodb://localhost:27017/your-db-name
* RABBITMQ_URL=amqp://localhost

## Start RabbitMQ in Docker

*docker pull rabbitmq:management
* docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:management
