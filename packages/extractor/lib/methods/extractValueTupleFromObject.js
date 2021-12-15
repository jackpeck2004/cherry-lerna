"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValueTupleFromObject = void 0;
const ValueTuple_1 = __importDefault(require("../models/ValueTuple"));
const extractCorrespondentValuesFromKeymap_1 = __importDefault(require("./extractCorrespondentValuesFromKeymap"));
const getScoredKeymapsFromObject_1 = __importDefault(require("./getScoredKeymapsFromObject"));
const extractValueTupleFromObject = (input) => {
    const keymaps = (0, getScoredKeymapsFromObject_1.default)(input);
    const data = Array.isArray(input) ? [...input] : Object.assign({}, input);
    let resultTuple = [];
    keymaps.forEach((keymap) => {
        const subTuple = (0, extractCorrespondentValuesFromKeymap_1.default)(keymap.keymap, data);
        resultTuple.push(subTuple);
    });
    if (resultTuple.length === 1 && Array.isArray(resultTuple[0])) {
        resultTuple = resultTuple[0];
    }
    return new ValueTuple_1.default(resultTuple);
};
exports.extractValueTupleFromObject = extractValueTupleFromObject;
exports.default = exports.extractValueTupleFromObject;
//# sourceMappingURL=extractValueTupleFromObject.js.map