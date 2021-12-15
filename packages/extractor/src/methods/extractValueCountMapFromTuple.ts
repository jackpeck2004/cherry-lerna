export const extractValueCountMapFromTuple = (
  tuple: string[]
): Map<string, number> => {
  const frequencies = new Map();

  tuple.forEach((value) => {
    if (frequencies.get(value)) {
      frequencies.set(value, frequencies.get(value) + 1);
    } else {
      frequencies.set(value, 1);
    }
  });

  return frequencies;
};

export default extractValueCountMapFromTuple;
