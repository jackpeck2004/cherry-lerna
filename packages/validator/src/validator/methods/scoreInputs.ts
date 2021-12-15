import { extractValueTupleFromObject } from "@cherry-challenge/extractor";
import ValueTuple from "../../models/ValueTuple";
import { cleanEmptyValues, cleanKeys } from "../../utils/functions";
// import { valueTupleFrequencyMap } from "../valueFrequencyMap";
import { incrementValue } from "./../valueFrequencyMap";
import { scoreTuple } from "./scoreTuple";

export const scoreInputs = async (
  valueTupleFrequencyMap: Map<string, number>,
  inputs: object[],
  challengeId: string
): Promise<number> => {
  // const score = inputs.reduce((partialScore, input) => {
  //   const cleanedInput = cleanKeys(input);

  //   const values: ValueTuple = extractValueTupleFromObject(cleanedInput);

  //   // Update valueTupleFrequencyMap incrementally
  //   const splitValues = values.resultTuple.map((e) => e.split(" ")).flat();
  //   const cleanedValues = cleanEmptyValues(splitValues);

  //   cleanedValues.forEach((value) => {
  //     const current = valueTupleFrequencyMap.get(value);
  //     if (current) {
  //       incrementValue(valueTupleFrequencyMap, value);
  //     } else {
  //       valueTupleFrequencyMap.set(value, 1);
  //     }
  //   });

  //   const local = await scoreTuple(values);

  //   return partialScore + local;
  // }, 0);

  const promises = inputs.map(async (input) => {
    const cleanedInput = cleanKeys(input);

    const values: ValueTuple = extractValueTupleFromObject(cleanedInput);

    // Update valueTupleFrequencyMap incrementally
    const splitValues = values.resultTuple.map((e) => e.split(" ")).flat();
    const cleanedValues = cleanEmptyValues(splitValues);

    cleanedValues.forEach((value) => {
      const current = valueTupleFrequencyMap.get(value);
      if (current) {
        incrementValue(valueTupleFrequencyMap, value);
      } else {
        valueTupleFrequencyMap.set(value, 1);
      }
    });

    const local = await scoreTuple(values, challengeId);
    return local;
  });

  const results = await Promise.all(promises);

  const sum = results.reduce(function (a, b) {
    return a + b;
  }, 0);

  return sum;
};
