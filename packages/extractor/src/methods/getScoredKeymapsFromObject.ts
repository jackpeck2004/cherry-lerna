import Keymap from "../models/Keymap";
import createFieldDictionaryFromKeymaps from "./createFieldDictionaryFromKeymaps";
import mapObjectKeysToArray from "./mapObjectKeysToArray";
import scoreKeymaps from "./scoreKeymaps";

const getScoredKeymapsFromObject = (data: object) => {
  let keymaps: Keymap[] = [];

  if (Array.isArray(data)) {
    Object.keys(data).forEach((key: any) => {
      const subKeymap = mapObjectKeysToArray(data[key]).map(
        (keymap) => `${isNaN(parseInt(key)) ? `${key}_` : ""}${keymap}`
      );
      keymaps = keymaps.concat(new Keymap(subKeymap));
    });
  } else {
    keymaps.push(new Keymap(mapObjectKeysToArray(data)));
  }
  const allFields = createFieldDictionaryFromKeymaps(keymaps);

  scoreKeymaps(keymaps, allFields);
  keymaps.sort((a, b) => b.score - a.score);

  return keymaps;
};

export default getScoredKeymapsFromObject;
