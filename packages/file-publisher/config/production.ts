// import path from "path";
const path = require("path");

module.exports = {
  rootPath: path.join(__dirname, ".."),
  port: process.env.PORT || 4001,
  multer: {
    dest: "uploads/",
  },
  kafka: {
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
    server: process.env.KAFKA_SERVER,
    name: process.env.KAFKA_NAME,
    topic: process.env.KAFKA_TOPIC,
  },
};
