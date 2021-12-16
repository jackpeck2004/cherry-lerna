// eslint-disable-next-line no-unused-vars
import Message from './Message';

export default class TopicMessage {
  topic: string;

  messages: Message[];

  constructor(topic: string, messages: Message[]) {
    this.topic = topic;
    this.messages = messages;
  }
}
