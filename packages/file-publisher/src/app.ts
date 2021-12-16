import PromisePool from "@supercharge/promise-pool";
import config from "config";
import express from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import { createBuckets } from "./file-publisher";
import { sendMessagesToTopic } from "./kafka/Publisher";
import Message from "./models/Message";
import { MulterConfig } from "./utils/types";
import cors from "cors";

const multerConfig: MulterConfig = config.get("multer");
const port = config.get("port");
const { topic } = config.get("kafka");

const app = express();
const upload = multer(multerConfig);

app.use(cors());

app.post("/publish", upload.single("file"), async (req: any, res: any) => {
  // TODO: convert csv to json

  try {
    const hash = nanoid();
    const buckets = createBuckets(req.file.path);
    const cid = req.headers["x-challenge-id"];

    await PromisePool.for(buckets)
      .withConcurrency(10)
      .process(async (bucket) => {
        const message = new Message(hash, JSON.stringify(bucket));
        message.headers = {
          challengeId: cid,
        };
        // message.headers.participantID = req.participantID;
        await sendMessagesToTopic(topic, [message]);
      })
      .finally(() => {
        console.log("completed");
      });

    res.send({
      fileId: hash,
    });
  } catch (e) {
    console.log("error", e);
    res.status(400).send("error");
  }
});

app.listen(port, () => {
  // runConsumer("challenge-grp-1", [topic]);
  console.log(`Server listening on port ${port}`);
});
