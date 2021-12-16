import { Bucket, RequestFile } from "../../utils/types";
import fs from "fs";
import config from "config";
import { calculateArraySizeInMb } from "../../utils/functions";

const rootPath = config.get("rootPath");

export const createBuckets = (filePath: string): Bucket[] => {
  try {
    // Read file
    const fileContents = fs.readFileSync(`${rootPath}/${filePath}`, "utf-8");
    const jsonFromFile: RequestFile = JSON.parse(fileContents);
    const { url, data } = jsonFromFile;
    let inputs = data.flat();

    // Calculate the size in MB of inputs
    const inputsSize = calculateArraySizeInMb(inputs);
    console.log(inputsSize);

    if (inputsSize <= 1) {
      return [inputs];
    }

    const buckets: Bucket[] = [];
    const initialLength = inputs.length;
    while (inputs.length !== 0) {
      buckets.push(inputs.splice(0, 100));
    }

    return buckets;
  } catch (e) {
    throw new Error(`error when creating buckets from file ${filePath}`);
  }

  return [];
};
