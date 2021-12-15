import Keymap from "../models/Keymap";

const scoreKeymaps = (keymaps: Keymap[], allFields: string[]) => {
  allFields.forEach((key) => {
    let scoreForKey = 0;
    const idxs: number[] = [];

    for (let i = 0; i < keymaps.length; i++) {
      const keymap = keymaps[i];
      if (keymap.keymap.includes(key)) {
        scoreForKey += 1;
        idxs.push(i);
      }
    }

    idxs.forEach(
      (idx) => (keymaps[idx].score += scoreForKey * scoreForKey * scoreForKey)
    );
  });

  keymaps.forEach((keymap) => {
    keymap.score -= keymap.keymap.length;
    keymap.score *= 10;
    keymap.score += keymap.keymap.length;
  });
};

export default scoreKeymaps;
