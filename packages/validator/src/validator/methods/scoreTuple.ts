import { extractValueTupleFromObject } from "@cherry-challenge/extractor";
import config from "config";
import ValueTuple from "../../models/ValueTuple";
import { cleanEmptyValues } from "../../utils/functions";
import { Challenge } from "./../../models/Challenge";

const { modifier: scoreModifier } = config.get("score");

export const scoreTuple = async (
  values: ValueTuple,
  challengeId: string
): Promise<number> => {
  const valueTupleIDArray = values.resultTuple.filter((e) =>
    /[FT]_[A-Z]*_\d+_\d+_(\d+)?/.test(e.toUpperCase())
  );

  let localScore = 0;

  if (valueTupleIDArray.length === 0) {
    // TODO: Handle no ID
  } else {
    const valueTupleID = valueTupleIDArray[0];

    const challenge = await Challenge.findOne({ id: challengeId }).exec();
    if (!challenge) {
      return 0;
    }

    const rawData: object[] = challenge.baseDataset.data;

    // rawData.map((datum) => console.log(extractValueTupleFromObject(datum)));
    const baseDataset = rawData.map((datum): string[] => {
      return cleanEmptyValues(
        Object.values(datum)
          .map((e) => e.split(" "))
          .flat()
      );
    });

    const correspondentTupleToID = baseDataset.filter((e: any[]) => {
      console.log(e);
      return e.includes(valueTupleID);
    });

    const tupleFromDatset = cleanEmptyValues(correspondentTupleToID[0]);
    console.log("banana");

    const splitResultTuple = values.resultTuple.map((e) => e.split(" ")).flat();

    const cleanedResultTuple = cleanEmptyValues(splitResultTuple);
    const set = new Set(tupleFromDatset.concat(values.resultTuple));

    if (set.size === cleanedResultTuple.length) {
      localScore += scoreModifier;
    } else if (tupleFromDatset.length > cleanedResultTuple.length) {
      localScore +=
        ((set.size - (tupleFromDatset.length - cleanedResultTuple.length)) /
          set.size) *
        scoreModifier;
    } else {
      localScore =
        ((set.size - (cleanedResultTuple.length - tupleFromDatset.length) / 2) /
          set.size) *
        scoreModifier;
    }

    return localScore;
  }

  return 0;
};
