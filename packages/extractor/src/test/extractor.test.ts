import Keymap from "../models/Keymap";
import "jest-extended";
import extractCorrespondentValuesFromKeymap from "../methods/extractCorrespondentValuesFromKeymap";
import extractValueTupleFromObject from "../methods/extractValueTupleFromObject";
import getScoredKeymapsFromObject from "../methods/getScoredKeymapsFromObject";
import mapObjectKeysToArray from "../methods/mapObjectKeysToArray";

it("Check method constructKeymapFromObject with Correct Data", () => {
  const res = mapObjectKeysToArray({
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
  const res1 = mapObjectKeysToArray({
    a: "a",
    b: 2,
    c: [
      {
        d: "d",
      },
    ],
  });

  const res2 = mapObjectKeysToArray({
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
  const res = getScoredKeymapsFromObject([
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

  const expected = new Keymap(["a", "b", "c_d"]);
  expected.score = 213;

  expect(res[1]).toStrictEqual(expected);
});

test("Check method extractValueTupleFromObject for top-level tuple", () => {
  const res = extractValueTupleFromObject({
    firstKey: "a",
    secondKey: 2,
    anotherKey: "test",
  });
  expect(res.resultTuple).toIncludeSameMembers(["test", "a", "2"]);
});

test("Check method extractValueTupleFromObject for tuple with arrays", () => {
  const res = extractValueTupleFromObject({
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
  const res = extractCorrespondentValuesFromKeymap(["g.b.f", "g.b.a"], {
    g: {
      b: {
        f: "ciao",
        a: "hello",
      },
    },
  });

  expect(res).toIncludeSameMembers(["hello", "ciao"]);
});
