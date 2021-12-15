"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keymap_1 = require("../models/Keymap");
const createFieldDictionaryFromKeymaps_1 = require("./createFieldDictionaryFromKeymaps");
const mapObjectKeysToArray_1 = require("./mapObjectKeysToArray");
const scoreKeymaps_1 = require("./scoreKeymaps");
const getScoredKeymapsFromObject = (data) => {
    let keymaps = [];
    if (Array.isArray(data)) {
        Object.keys(data).forEach((key) => {
            const subKeymap = (0, mapObjectKeysToArray_1.default)(data[key]).map((keymap) => `${isNaN(parseInt(key)) ? `${key}_` : ""}${keymap}`);
            keymaps = keymaps.concat(new Keymap_1.default(subKeymap));
        });
    }
    else {
        keymaps.push(new Keymap_1.default((0, mapObjectKeysToArray_1.default)(data)));
    }
    const allFields = (0, createFieldDictionaryFromKeymaps_1.default)(keymaps);
    (0, scoreKeymaps_1.default)(keymaps, allFields);
    keymaps.sort((a, b) => b.score - a.score);
    return keymaps;
};
exports.default = getScoredKeymapsFromObject;
//# sourceMappingURL=getScoredKeymapsFromObject.js.map