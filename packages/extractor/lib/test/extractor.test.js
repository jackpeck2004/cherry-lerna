"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Keymap_1 = __importDefault(require("../models/Keymap"));
require("jest-extended");
const extractCorrespondentValuesFromKeymap_1 = __importDefault(require("../methods/extractCorrespondentValuesFromKeymap"));
const extractValueTupleFromObject_1 = __importDefault(require("../methods/extractValueTupleFromObject"));
const getScoredKeymapsFromObject_1 = __importDefault(require("../methods/getScoredKeymapsFromObject"));
const mapObjectKeysToArray_1 = __importDefault(require("../methods/mapObjectKeysToArray"));
it("Check method constructKeymapFromObject with Correct Data", () => {
    const res = (0, mapObjectKeysToArray_1.default)({
        a: "a",
        b: 2,
        c: [
            {
                d: "d",
            },
        ],
    });
    expect(res).toStrictEqual(["a", "b", "c_d"]);
});
test("Check method constructKeymapFromObject with Same Data but ordered different", () => {
    const res1 = (0, mapObjectKeysToArray_1.default)({
        a: "a",
        b: 2,
        c: [
            {
                d: "d",
            },
        ],
    });
    const res2 = (0, mapObjectKeysToArray_1.default)({
        b: 2,
        a: "a",
        c: [
            {
                d: "d",
            },
        ],
    });
    expect(res1).toStrictEqual(res2);
});
test("Check method getScoredKeymapsFromObject with Array of Objects", () => {
    const res = (0, getScoredKeymapsFromObject_1.default)([
        {
            a: "a",
            b: 2,
            c: [
                {
                    d: "d",
                },
            ],
        },
        {
            a: "a",
            b: 2,
            c: [
                {
                    d: "d",
                },
            ],
        },
    ]);
    const expected = new Keymap_1.default(["a", "b", "c_d"]);
    expected.score = 213;
    expect(res[1]).toStrictEqual(expected);
});
test("Check method extractValueTupleFromObject for top-level tuple", () => {
    const res = (0, extractValueTupleFromObject_1.default)({
        firstKey: "a",
        secondKey: 2,
        anotherKey: "test",
    });
    expect(res.resultTuple).toIncludeSameMembers(["test", "a", "2"]);
});
test("Check method extractValueTupleFromObject for tuple with arrays", () => {
    const res = (0, extractValueTupleFromObject_1.default)({
        a: "a",
        b: "b",
        c: [
            {
                d: "banana",
                f: ["fdsdf"],
                g: [],
            },
            {
                e: "ciao",
            },
        ],
    });
    expect(res.resultTuple).toIncludeSameMembers([
        "a",
        "b",
        "banana",
        "fdsdf",
        "ciao",
    ]);
});
test("Check method extractCorrespondentValuesFromKeymap with nested objects", () => {
    const res = (0, extractCorrespondentValuesFromKeymap_1.default)(["g.b.f", "g.b.a"], {
        g: {
            b: {
                f: "ciao",
                a: "hello",
            },
        },
    });
    expect(res).toIncludeSameMembers(["hello", "ciao"]);
});
//# sourceMappingURL=extractor.test.js.map