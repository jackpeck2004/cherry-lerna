import {
  extractValueCountMapFromTuple,
  extractValueTupleFromObject,
} from "@cherry-challenge/extractor";
import config from "config";
import fs from "fs";
import glob from "glob";
import { cleanEmptyValues } from "../utils/functions";

const rootPath = config.get("rootPath");

export const getBaseDataset = (): string[][] => {
  let srcFilesPath = `${rootPath}/src/dataSet/src/**.json`;

  if (process.env.NODE_ENV === "production") {
    srcFilesPath = `${rootPath}/dataSet/src/**.json`;
  }
  console.log("srcFilesPath", srcFilesPath);

  let srcFiles = glob.sync(srcFilesPath);

  console.log("srcFiles", srcFiles);

  let data: string[][] = [];

  srcFiles.forEach((file) => {
    const fileContents = fs.readFileSync(file, "utf-8");
    const json = JSON.parse(fileContents).data;
    const tuple = json.map((obj) => {
      const extractedTuple = extractValueTupleFromObject(obj);
      return extractedTuple.resultTuple
        .map((value) => {
          let tmparr: string[] = [];
          tmparr = [...value.split(" ")];
          return tmparr;
        })
        .flat();
    });
    data = data.concat(tuple);
  });

  return data;
};

// export const baseDataset = getBaseDataset();
export const baseDataset = [];

// export const normalizer = baseDataset.length;
export const normalizer = 3;

export const getDataSetFrequencyMap: Map<string, number> =
  extractValueCountMapFromTuple(
    cleanEmptyValues(
      getBaseDataset()
        .flat()
        .map((e) => e.split(" "))
        .flat()
    )
  );
