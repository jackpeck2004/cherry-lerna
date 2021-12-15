export const cleanKeys = (obj: object): object => {
  const strObj = JSON.stringify(obj);
  let str = strObj;
  const matches = strObj.match(/"[^\>:,]*":/g);
  // console.log("matches", matches);
  matches?.forEach((match) => {
    const corrected = match.replace(/_/g, "").replace(/\./g, "");
    // console.log(match, corrected);
    str = str.replace(match, corrected);
  });
  // console.log(str);
  const cleanedObj = JSON.parse(str);
  return cleanedObj;
};

export const cleanEmptyValues = (tuple: string[]): string[] =>
  tuple.filter((e) => e.length);

export const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const similMaps = (
  first: Map<string, number>,
  second: Map<string, number>
): number => {
  let tot = 1;
  const largest = first.size > second.size ? first : second;
  const smallest = second.size > first.size ? second : first;
  const mod = 1 / largest.size;
  if (largest.size !== smallest.size) {
    const diff = largest.size - smallest.size;
    tot -= mod * diff;
  }
  for (const [key, val] of largest) {
    if (smallest.get(key) !== val) {
      tot -= mod;
    }
  }
  return tot;
};
