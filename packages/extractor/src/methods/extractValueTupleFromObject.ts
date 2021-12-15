import Keymap from "../models/Keymap";
import ValueTuple from "../models/ValueTuple";
import extractCorrespondentValuesFromKeymap from "./extractCorrespondentValuesFromKeymap";
import getScoredKeymapsFromObject from "./getScoredKeymapsFromObject";

export const extractValueTupleFromObject = (input: object): ValueTuple => {
  const keymaps: Keymap[] = getScoredKeymapsFromObject(input);

  // create copy of input
  const data = Array.isArray(input) ? [...input] : { ...input };

  let resultTuple: any = [];

  // console.log("keymaps", keymaps);

  keymaps.forEach((keymap) => {
    const subTuple = extractCorrespondentValuesFromKeymap(keymap.keymap, data);
    resultTuple.push(subTuple);
  });

  if (resultTuple.length === 1 && Array.isArray(resultTuple[0])) {
    resultTuple = resultTuple[0];
  }

  return new ValueTuple(resultTuple);
};

export default extractValueTupleFromObject;
