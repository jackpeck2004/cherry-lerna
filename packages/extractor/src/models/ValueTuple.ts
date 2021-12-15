import { nanoid } from "nanoid";

export default class ValueTuple {
  id = nanoid();
  resultTuple: string[];

  constructor(resultTuple: string[]) {
    this.resultTuple = resultTuple;
  }
}
