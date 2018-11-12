"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storable_1 = require("./storable");
class Record extends storable_1.Storable {
    constructor(options, $repository) {
        super($repository);
    }
    $save() {
        throw new Error('Method not implemented.');
    }
    $delete() {
        throw new Error('Method not implemented.');
    }
}
exports.Record = Record;
//# sourceMappingURL=record.js.map