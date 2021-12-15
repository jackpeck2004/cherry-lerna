// import { valueTupleFrequencyMap } from "./../valueFrequencyMap";
import { normalizer } from "./../../dataSet/index";
import { similMaps } from "./../../utils/functions";
import config from "config";
import fs from "fs";
import { RequestFile } from "../../utils/types";
import { scoreInputs } from "./scoreInputs";
import { getDataSetFrequencyMap } from "../../dataSet";

const rootPath = config.get("rootPath");
const { modifier: scoreModifier } = config.get("score");

export const validateFile = async (
  filePath: string,
  challengeId: string
): Promise<number> => {
  try {
    const fileContents = fs.readFileSync(`${rootPath}/${filePath}`, "utf-8");
    const jsonFromFile: RequestFile = JSON.parse(fileContents);
    const { data } = jsonFromFile;
    let inputs = data.splice(0, 10);

    const score = await validateInputs(inputs, challengeId);

    if (!score) {
      throw new Error("could not score")
    }

    // const score = inputs.reduce((partialScore: number, input) => {
    //   return partialScore + validateInputs([].concat(input));
    // }, 0);
    return score;
  } catch (e) {
    throw new Error(`error when scoring file ${filePath}`);
  }
};

export const validateInputs = async (
  inputs: any[],
  challengeId: string
): Promise<number> => {
  try {
    let valueTupleFrequencyMap: Map<string, number> = new Map();

    if (inputs.length === 1 && Array.isArray(inputs[0])) {
      inputs = inputs[0];
    }

    const partialScore = scoreInputs(valueTupleFrequencyMap, inputs, challengeId);
    const similarity =
      similMaps(getDataSetFrequencyMap, valueTupleFrequencyMap) * 100;
    const score =
      ((await partialScore) * similarity) / (normalizer * scoreModifier);

    return score;
  } catch (e) {
    throw new Error(`error when scoring input`)
  }
};
