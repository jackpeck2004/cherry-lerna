"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
class ValueTuple {
    constructor(resultTuple) {
        this.id = (0, nanoid_1.nanoid)();
        this.resultTuple = resultTuple;
    }
}
exports.default = ValueTuple;
//# sourceMappingURL=ValueTuple.js.map