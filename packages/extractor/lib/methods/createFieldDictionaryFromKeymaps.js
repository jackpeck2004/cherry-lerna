"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFieldDictionaryFromKeymaps = void 0;
const createFieldDictionaryFromKeymaps = (keymaps) => {
    const concatKeymaps = keymaps
        .map((keymap) => keymap.keymap)
        .reduce((prev, current) => {
        return [].concat(prev).concat(current);
    }, []);
    const allFields = Array.from(new Set(concatKeymaps));
    return allFields;
};
exports.createFieldDictionaryFromKeymaps = createFieldDictionaryFromKeymaps;
exports.default = exports.createFieldDictionaryFromKeymaps;
//# sourceMappingURL=createFieldDictionaryFromKeymaps.js.map