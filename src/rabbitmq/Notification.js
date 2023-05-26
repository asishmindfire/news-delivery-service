const { QUEUE_NAME } = require("./rabbitMQ");

async function comsumeQueue(channel) {
  return new Promise((resolve, reject) => {
    channel.consume(QUEUE_NAME, (data) => {
      console.log(`Consuming ${QUEUE_NAME} Queue`);
      const newsData = JSON.parse(data.content);
      if (newsData.updatedEntries > 0) {
        channel.ack(data);
        console.log(`Acknowledged the event`);
        return resolve();
      }
    });
  });
}

module.exports = {
  comsumeQueue,
};
