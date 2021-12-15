"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObjectKeysToArray = void 0;
const mapObjectKeysToArray = (object) => {
    let keymap = [];
    Object.keys(object).forEach((key) => {
        const value = object[key];
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                if (typeof value[0] !== "object") {
                    keymap.push(key);
                }
                else {
                    Object.keys(value).map((subkey) => {
                        (0, exports.mapObjectKeysToArray)(value[subkey]).forEach((levelKey) => {
                            keymap.push(`${key}_${levelKey}`);
                        });
                    });
                }
            }
            else {
                keymap.push(`${key}.${(0, exports.mapObjectKeysToArray)(value)}`);
            }
        }
        else {
            keymap.push(key);
        }
    });
    return keymap.sort();
};
exports.mapObjectKeysToArray = mapObjectKeysToArray;
exports.default = exports.mapObjectKeysToArray;
//# sourceMappingURL=mapObjectKeysToArray.js.map