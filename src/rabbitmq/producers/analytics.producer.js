/** @format */

const { MAPPINGS, EXCHANGE_NAME } = require("../config");
const mqConnection = require("../mqConnection");

const STATUS_DATA = ["block", "todo", "progress", "done", "delete"];

async function analyticsProducer(data) {
  try {
    const { channel } = await mqConnection();
    if (data && STATUS_DATA.includes(data.status)) {
      channel.publish(
        EXCHANGE_NAME,
        MAPPINGS.ANALYTICS.ROUTING_KEY,
        Buffer.from(JSON.stringify(data))
      );
      console.log("Message successfully published");
    }
  } catch (error) {
    console.log();
  }
}

module.exports = analyticsProducer;
