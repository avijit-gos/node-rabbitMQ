/** @format */

const { EXCHANGE_NAME, EXCHANGE_TYPE, MAPPINGS } = require("./config");
const mqConnection = require("./mqConnection");
const amqp = require("amqplib");

async function mqInit() {
  try {
    const { channel } = await mqConnection();
    // assert Exchange
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
      durable: true,
    });

    for (let key in MAPPINGS) {
      const { QUEUE, ROUTING_KEY } = MAPPINGS[key];
      // assert Queue
      await channel.assertQueue(QUEUE, { durable: true });
      console.log(`** ${QUEUE} has been created...`);
      // bind Exchange with Queue
      await channel.bindQueue(QUEUE, EXCHANGE_NAME, ROUTING_KEY);
      console.log(`** ${QUEUE} has been binded with Exchange...`);
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = mqInit;
