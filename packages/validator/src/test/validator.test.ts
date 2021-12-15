import config from "config";
import fs from "fs";
import { nanoid } from "nanoid";
import * as validator from "../validator";

const rootPath = config.get("rootPath");
const { modifier: scoreModifier } = config.get("score");

const { data } = JSON.parse(
  fs.readFileSync(`${rootPath}/src/dataSet/src/correct_formatted.json`, "utf-8")
);
const maxScoreFromCorrectFormatted = scoreModifier;

test("Check score with unkown file", () => {
  const fileName = "testFileNameWhichDoesNotExist";
  expect(() => {
      validator.validateFile(fileName, "idThatDoesNotExist")
  }).toThrow()
    //`error when scoring file ${fileName}`
  //)
});

test("Check validator with dataset as input", () => {
  const scoredCorrectFormatted = validator.validateFile(
    `src/dataSet/src/correct_formatted.json`,
    "sampleId"
  );
  expect(scoredCorrectFormatted).toBe(maxScoreFromCorrectFormatted);
});

test("Check validator with a tuple of less elements than dataset", () => {
  const res = data.map((obj) => {
    delete obj.B;

    return obj;
  });

  const tmpDir = `${rootPath}/src/test/tmp`;

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const fileName = `${nanoid()}.json`;
  const filePath = `${tmpDir}/${fileName}`;
  fs.writeFileSync(
    filePath,
    JSON.stringify({ url: "banana", data: res }, null, 2)
  );

  const score = validator.validateFile(`/src/test/tmp/${fileName}`, "idThatDoesNotExist" );

  fs.rmdirSync(tmpDir, { recursive: true });

  expect(score).toBeLessThan(maxScoreFromCorrectFormatted);
});
