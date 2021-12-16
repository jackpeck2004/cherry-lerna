import fs from "fs";
import config from "config";

import { createBuckets } from "../file-publisher"

const rootPath = config.get("rootPath");


test("Check buckets are created on large file (50MB)", () => {
	//Users/jackpeck/Documents/dev/cherry-hackathon/validator/dataSets/correct.json

  const relPath="src/test/testFiles/correct.json";
  const filePath = `${rootPath}/${relPath}`;
  const {data} = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const num = data.length / 100;

  const buckets = createBuckets(relPath);

  expect(buckets.length).toBe(Math.ceil(num));

});

test("Check createBuckets with non-existent filePath", () => {
  expect(() => {
    createBuckets("nonExistentFile")
  }).toThrow()
});
