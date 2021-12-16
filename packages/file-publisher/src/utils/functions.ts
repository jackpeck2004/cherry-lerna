export const calculateArraySizeInMb = (arr): number =>
  Buffer.from(JSON.stringify(arr)).length / 1000000;
