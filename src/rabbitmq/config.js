/** @format */

module.exports = {
  CONNECTION_URL: "amqp://localhost",
  EXCHANGE_NAME: "task_exchange",
  EXCHANGE_TYPE: "direct",

  MAPPINGS: {
    ANALYTICS: {
      QUEUE: "analytics_queue",
      ROUTING_KEY: "analytics",
    },
    TASK_ANALYTICS: {
      QUEUE: "task_analytics_queue",
      ROUTING_KEY: "task_analytics",
    },
    LOG: {
      QUEUE: "log_queue",
      ROUTING_KEY: "log",
    },
  },
};
