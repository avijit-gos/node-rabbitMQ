/** @format */

const amqp = require("amqplib");
const { CONNECTION_URL } = require("./config");

let connection = null;
let channel = null;

async function mqConnection() {
  try {
    // if connection & channel already establish
    // we share the existing connection & channel
    // rather than create a new TCP connection
    if (connection && channel) return { connection, channel };

    // if connection & channel not establish then create a new connection & channel
    connection = await amqp.connect(CONNECTION_URL);
    channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.log(error);
  }
}
module.exports = mqConnection;
