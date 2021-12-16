export default class Message {
  key: string;

  value: any;

  headers: any = {};

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
