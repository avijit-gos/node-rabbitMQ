/** @format */
const mqConnection = require("../mqConnection");
const Analytics = require("../../models/analytics.model");
const { MAPPINGS } = require("../config");
require("dotenv").config({ path: "../../../.env" });
require("../../configs/mongo.config");

const STATUS_DATA = ["block", "todo", "progress", "done", "delete"];

async function analyticsConsumer() {
  try {
    const { channel } = await mqConnection();

    channel.prefetch(1);
    channel.consume(MAPPINGS.ANALYTICS.QUEUE, async (message) => {
      if (message) {
        const data = JSON.parse(message.content);
        const status = data.status;
        if (STATUS_DATA.includes(status)) {
          const update = {
            $inc:
              status === "todo"
                ? { [status]: 1, totalTasks: 1 }
                : { [status]: 1, [data.previousStatus]: -1 },
            $set: { lastUpdated: new Date() },
          };

          await Analytics.findOneAndUpdate({}, update, {
            upsert: true,
            new: true,
          });

          console.log(`Updated status count for: ${status}`);
          channel.ack(message);
        } else {
          console.warn(`Unknown status received: ${status}`);
          channel.nack(message);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
analyticsConsumer();
