"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValueCountMapFromTuple = void 0;
const extractValueCountMapFromTuple = (tuple) => {
    const frequencies = new Map();
    tuple.forEach((value) => {
        if (frequencies.get(value)) {
            frequencies.set(value, frequencies.get(value) + 1);
        }
        else {
            frequencies.set(value, 1);
        }
    });
    return frequencies;
};
exports.extractValueCountMapFromTuple = extractValueCountMapFromTuple;
exports.default = exports.extractValueCountMapFromTuple;
//# sourceMappingURL=extractValueCountMapFromTuple.js.map