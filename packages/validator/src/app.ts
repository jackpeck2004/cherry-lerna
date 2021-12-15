import config from "config";
import { MulterConfig } from "./utils/types";
import { validateFile } from "./validator";
import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import runConsumer from "./kafka/Consumer";
import ScoreModel from "./models/Score";

/*
 * MongoDB
 */

const mongoConfig: { url: string; dbName: string } = config.get("mongo");

mongoose.connect(mongoConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ScoreModel.create({ hash: "lfdskjf", score: 10 }).then((doc) =>
//   console.log(doc)
// );

/*
 * Kafka Consumer:
 * Consumer to recieve messages from kafka and push
 * sore them. Next it updates the db with the additional
 * points validated.
 */

const { topic } = config.get("kafka");

runConsumer("challenge-grp-1", [topic]);

/*
 * Express Initialization:
 * used for debugging and development, it's not
 * meant to be used for production
 */

// const multerConfig: MulterConfig = config.get("multer");
// const port = config.get("port");
// //
// const app = express();
// const upload = multer(multerConfig);

// app.post(
//   "/validate",
//   upload.single("outputFileToParse"),
//   (req: any, res: any) => {
//     // TODO: convert csv to json

//     try {
//       const points = validateFile(req.file.path);
//       res.send(points.toString());
//     } catch (e) {
//       console.log("error", e);
//       res.status(400).send("error");
//     }
//   }
// );

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
