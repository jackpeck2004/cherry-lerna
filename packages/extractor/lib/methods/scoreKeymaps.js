"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoreKeymaps = (keymaps, allFields) => {
    allFields.forEach((key) => {
        let scoreForKey = 0;
        const idxs = [];
        for (let i = 0; i < keymaps.length; i++) {
            const keymap = keymaps[i];
            if (keymap.keymap.includes(key)) {
                scoreForKey += 1;
                idxs.push(i);
            }
        }
        idxs.forEach((idx) => (keymaps[idx].score += scoreForKey * scoreForKey * scoreForKey));
    });
    keymaps.forEach((keymap) => {
        keymap.score -= keymap.keymap.length;
        keymap.score *= 10;
        keymap.score += keymap.keymap.length;
    });
};
exports.default = scoreKeymaps;
//# sourceMappingURL=scoreKeymaps.js.map