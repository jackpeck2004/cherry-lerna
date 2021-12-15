"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractCorrespondentValuesFromKeymap = (keymap, data) => {
    let subTuple = [];
    keymap.forEach((key, idx) => {
        if (/_/.test(key)) {
            const pathArray = key.split("");
            const rootKey = pathArray.splice(0, 1)[0];
            pathArray.splice(0, 1);
            const pathString = pathArray.join("_");
            const subData = Array.isArray(data) ? data[0][rootKey] : data[rootKey];
            const newKeymap = Array.from(pathString);
            if (rootKey) {
                subData.forEach((datum) => {
                    const d = extractCorrespondentValuesFromKeymap(newKeymap, datum);
                    if (d[0]) {
                        subTuple.push(d[0]);
                    }
                });
            }
            else {
                subTuple.push(key);
            }
        }
        else if (/\./.test(key)) {
            const pathAsArray = key.split(".");
            const base = pathAsArray.splice(0, 1)[0];
            const value = data[base];
            const newKeymap = [];
            newKeymap.push(pathAsArray.join("."));
            subTuple.push(extractCorrespondentValuesFromKeymap(newKeymap, value)[0]);
        }
        else {
            const value = data[key];
            if (typeof value !== "undefined") {
                if (Array.isArray(value)) {
                    const tmp = value.map((v) => v.toString());
                    subTuple = subTuple.concat(tmp);
                }
                else {
                    subTuple.push(value.toString());
                }
            }
        }
    });
    return subTuple;
};
exports.default = extractCorrespondentValuesFromKeymap;
//# sourceMappingURL=extractCorrespondentValuesFromKeymap.js.map