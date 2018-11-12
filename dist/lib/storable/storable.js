"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
class Storable extends debug_1.Debugable {
    constructor($repository) {
        super();
        this.$repository = $repository;
        this.$debugType = `db:${this.$repository.name}:entity`;
        this.$connectionName = this.$repository.$connectionName;
    }
}
exports.Storable = Storable;
//# sourceMappingURL=storable.js.map