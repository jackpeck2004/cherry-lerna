// import path from "path";
const path = require("path");

module.exports = {
  rootPath: process.env.ROOT_PATH || path.join(__dirname, ".."),
  port: process.env.PORT || 4000,
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
  mongo: {
    dbName: process.env.DB_NAME,
    url: process.env.MONGO_URI,
  },
  score: {
    modifier: process.env.SCORE_MODIFIER || 100,
  },
};
