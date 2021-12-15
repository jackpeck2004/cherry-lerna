import Keymap from "../models/Keymap";

export const createFieldDictionaryFromKeymaps = (
  keymaps: Keymap[]
): string[] => {
  const concatKeymaps = keymaps
    .map((keymap: Keymap) => keymap.keymap)
    .reduce((prev: any, current: any) => {
      return [].concat(prev).concat(current);
    }, []);

  const allFields: any = Array.from(new Set(concatKeymaps));
  return allFields;
};

export default createFieldDictionaryFromKeymaps;
