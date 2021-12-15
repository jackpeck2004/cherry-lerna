import * as utils from "../utils/functions";

test("Check method cleanKeys with top-level object", () => {
  const res = utils.cleanKeys({
    banana: "1",
    test_key: "2",
    "another.test": "3",
    "last_test.with_.point..and__underscore": "4",
  });

  expect(res).toStrictEqual({
    banana: "1",
    testkey: "2",
    anothertest: "3",
    lasttestwithpointandunderscore: "4",
  });
});

test("Check method cleanKeys with nested object", () => {
  const res = utils.cleanKeys({
    top_level: "1",
    "nested.key": {
      ".first_.nested._level_": "2",
      ".second.nested._level_": "3",
    },
  });
  expect(res).toStrictEqual({
    toplevel: "1",
    nestedkey: {
      firstnestedlevel: "2",
      secondnestedlevel: "3",
    },
  });
});

test("Check method cleanKeys with arrays", () => {
  const res = utils.cleanKeys({
    test: [
      {
        hello_world: [
          {
            "one.test": "1",
          },
        ],
      },
    ],
    "test.2": ["first_value", "second_value"],
  });
  expect(res).toStrictEqual({
    test: [
      {
        helloworld: [
          {
            onetest: "1",
          },
        ],
      },
    ],
    test2: ["first_value", "second_value"],
  });
});

test("Check method similMaps between two equal maps", () => {
  const map: Map<string, number> = new Map();

  map.set("one", 12);
  map.set("two", 25);

  expect(utils.similMaps(map, map)).toBe(1);
});

test("Check method similMaps between two completley different maps", () => {
  const map1 = new Map();
  const map2 = new Map();

  map1.set("first", 12);
  map2.set("second", 12);

  expect(utils.similMaps(map1, map2)).toBe(0);
});

test("Check method similMaps between two different maps", () => {
  const map1 = new Map();
  const map2 = new Map();

  map1.set("first", 12);
  map1.set("third", 12);
  map2.set("third", 10);
  map2.set("first", 12);

  expect(utils.similMaps(map1, map2)).toBe(0.5);
});
