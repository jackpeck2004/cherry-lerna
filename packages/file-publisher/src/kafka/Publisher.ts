/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Kafka, Producer } from "kafkajs";
import Message from "../models/Message";
import TopicMessage from "../models/TopicMessage";

import config from "config";

const { name, username, password, server } = config.get("kafka");

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
let producer: Producer;
/**
 * send a message to Kafka
 * @param topic name of topic as string
 * @param message [{key: 'key1', value: any, [partition: n] }, ...]
 * @param headers { header1: value1, header2: value2, etc..}
 */
export async function sendMessagesToTopic(topic: string, messages: Message[]) {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
  }
  const result = await producer.send({
    topic,
    messages,
    timeout: 120000,
  });
  console.log(`sendMessagesToTopic => Result => ${JSON.stringify(result)}`);
}
export async function startProducer() {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
    console.log("Producer started");
  }
}
export async function disconnectProducer() {
  if (producer) {
    await producer.disconnect();
  }
}
/**
 *
 * @param topicMessages <topic, messages> envelop
 */
export async function sendBatchMessage(topicMessages: TopicMessage[]) {
  if (topicMessages.length) {
    console.log("sendBatchMessage => first ==> ", topicMessages[0]);
    if (!producer) {
      producer = kafka.producer();
      await producer.connect();
    }
    await producer.sendBatch({ topicMessages });
  } else {
    console.log("sendBatchMessage ==> no messages to send");
  }
}
export async function tryCreateTopic(topic: string) {
  const admin = kafka.admin();
  await admin.connect();
  // true if new created, false if already exist
  // default configurations
  console.log(`Try creating topic ==>  ${topic}`);
  const opResult = await admin.createTopics({
    validateOnly: false,
    waitForLeaders: false,
    timeout: 30000,
    topics: [
      {
        topic,
        numPartitions: 2,
        configEntries: [
          {
            "retention.ms": "604800000", // 1 week
            "cleanup.policy": "delete",
            "retention.bytes": -1,
            "max.message.bytes": "2097164",
          },
        ],
      },
    ],
  });
  await admin.disconnect();
  return opResult;
}
