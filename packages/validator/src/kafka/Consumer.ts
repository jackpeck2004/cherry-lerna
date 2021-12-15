/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import config from "config";
import { validateInputs } from "./../validator/methods/validate";
import fs from "fs";
import { Consumer, Kafka } from "kafkajs";
import ScoreModel from "../models/Score";

const { name, username, password, server } = config.get("kafka");
const rootPath = config.get("rootPath");

const kafka = new Kafka({
  clientId: name,
  brokers: [server],
  // authenticationTimeout: 1000,
  // reauthenticationThreshold: 10000,
  ssl: true,
  sasl: {
    mechanism: "plain", // scram-sha-256 or scram-sha-512
    username: username,
    password: password,
  },
  authenticationTimeout: 30000,
  connectionTimeout: 30000,
});
let consumer: Consumer;
// business logic to process the message
/**
 * Process messageModule
 * @param messagesByModule {  module: moduleName, message: JSON.parse(message.value.toString()), originalMessage }
 */

async function processMessage(message: any) {
  const inputs = JSON.parse(message.value.toString());
  const hash = message.key.toString();
  const challengeId = message.headers.challengeId.toString();
  const localScore = await validateInputs(inputs, challengeId);
  const isIncrement = await ScoreModel.exists({ hash });
  if (isIncrement) {
    // Updated Models
    const prev = await ScoreModel.findOne({ hash }).exec();
    if (prev) {
      await ScoreModel.updateOne(
        {
          hash,
        },
        {
          score: ((await localScore) + prev.score) / (prev.packets + 1),
          packets: prev.packets + 1,
        }
      ).exec();
    }
  } else {
    ScoreModel.create({ hash, score: localScore, packets: 1 });
  }
  console.log(`key: ${hash} has added points: ${localScore}`);
}

function getValueFromBuffer(rawData: any, outputType: string) {
  let strinValue = "";
  if (rawData) {
    const buffer = Buffer.from(rawData);
    strinValue = buffer.toString("utf-8");
  }
  if (outputType === "int") {
    if (!strinValue.length) strinValue = "0";
    return parseInt(strinValue, 10);
  }
  return strinValue;
}
/**
 *
 * @param groupId id of the consumer group
 * @param topics  list of topics to subscribe (eg. zoho, zoho-worker)
 */
export default async function runConsumer(groupId: string, topics: string[]) {
  if (!consumer) {
    consumer = kafka.consumer({
      groupId,
      heartbeatInterval: 30000, // 5 minute heatbeat
      sessionTimeout: 150000, // 6 minute timeout
    });
    await consumer.connect();
  }
  // subscribe to all topicss
  await Promise.all(
    topics.map(async (topic) => {
      await consumer.subscribe({ topic });
    })
  );
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processMessage(message);
    },
  });
}
