const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { Server } = require("socket.io");
const http = require("http");
let { RabbitMQConnect } = require("./src/rabbitmq/rabbitMQ");
const { comsumeQueue } = require("./src/rabbitmq/Notification");

app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./.env" });

// Connection to MongoDb
require("./src/db/connection");

// Creates an HTTP server using the Express app.
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Connection to RabbitMQ
RabbitMQConnect().then((data) => {
  if (data) {
    comsumeQueue(data).then(() => {
      io.on("connection", (socket) => {
        console.log(`Socket Connected: ${socket.id}`);
        socket.emit("news_updated", { message: true });
      });
      return;
    });
    return;
  }
  throw new Error("RabbitMQ not connected!");
});

app.use("/api/v1/news-feed", require("./src/apis/router/news/news.route"));
app.use(
  "/api/v1/category",
  require("./src/apis/router/category/category.route")
);

server.listen(process.env.PORT, () => {
  var host = "localhost";
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
