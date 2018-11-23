"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
const storable_1 = require("../storable");
const broken_1 = require("./broken");
const entity_1 = require("./entity");
const record_1 = require("./record");
function makeRepository(name, connection, data) {
    let Repo = broken_1.BrokenRepository;
    if (data.prototype instanceof storable_1.Entity) {
        Repo = entity_1.EntityRepository;
    }
    else if (data.prototype instanceof storable_1.Record) {
        Repo = record_1.RecordRepository;
    }
    else {
        debug_1.print(connection.name, 'db', `No suitable repository found for "${data.name}".`, 'error');
    }
    return new Repo(name, connection, data);
}
exports.makeRepository = makeRepository;
//# sourceMappingURL=factory.js.map