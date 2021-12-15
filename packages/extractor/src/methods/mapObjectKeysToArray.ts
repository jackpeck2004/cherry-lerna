export const mapObjectKeysToArray = (object: any): string[] => {
  let keymap: string[] = [];

  Object.keys(object).forEach((key: string) => {
    const value = object[key];
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (typeof value[0] !== "object") {
          keymap.push(key);
        } else {
          Object.keys(value).map((subkey: any) => {
            mapObjectKeysToArray(value[subkey]).forEach((levelKey) => {
              keymap.push(`${key}_${levelKey}`);
            });
          });
        }
      } else {
        // it's an object
        keymap.push(`${key}.${mapObjectKeysToArray(value)}`);
      }
    } else {
      keymap.push(key);
    }
  });

  return keymap.sort();
};

export default mapObjectKeysToArray;
