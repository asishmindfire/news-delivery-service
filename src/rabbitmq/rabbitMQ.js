const amqp = require("amqplib");

const QUEUE_NAME = "NEWS";

async function RabbitMQConnect() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const amqpServer = process.env.AMQP_SERVER;
            if (!amqpServer) {
              throw new Error("AMQP_SERVER URL is not defined");
            }
            const connection = await amqp.connect(amqpServer);
            const channel = await connection.createChannel();
            console.log(`Connected to RabbitMQ`);
            return resolve(channel);
          } catch (error) {
            console.log(`Error while connecting to rabbitmq :`, error);
          }
        }, 5000);
    });
}

module.exports = {
  QUEUE_NAME,
  RabbitMQConnect,
};
