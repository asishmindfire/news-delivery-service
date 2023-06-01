const { QUEUE_NAME } = require("./rabbitMQ");
const newsRepository = require("../apis/repositories/news.repository");

async function comsumeQueue(channel, io) {
  return new Promise((resolve, reject) => {
    channel.consume(QUEUE_NAME, async (data) => {
      console.log(`Consuming ${QUEUE_NAME} Queue`);
      const newsData = JSON.parse(data.content);
      console.log(`newsData`, newsData);
      channel.ack(data);
      if (newsData.count > 0) {
        const latestNews = await newsRepository.getLatestNews({
          query: {},
          limit: newsData.count,
        });
        console.log(`latestNews`, latestNews);
        io.emit("news_updated", { status: true, latestNews });
        console.log(`Acknowledged the event`);
        return resolve(true);
      }
    });
  });
}

module.exports = {
  comsumeQueue,
};
