export let valueTupleFrequencyMap: Map<string, number> = new Map();

export const incrementValue = (map: Map<string, number>, value: string) => {
  const current = map.get(value);
  if (current) {
    map.set(value, current + 1);
  } else {
    throw new Error(`value ${value} does not exist in tuple`);
  }
};
