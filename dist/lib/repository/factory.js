"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
const storable_1 = require("../storable");
const base_1 = require("./base");
const entityRepository_1 = require("./entityRepository");
const recordRepository_1 = require("./recordRepository");
function makeRepository(name, connection, data) {
    let Constructor;
    if (data.prototype instanceof storable_1.Entity) {
        Constructor = entityRepository_1.EntityRepository;
    }
    else if (data.prototype instanceof storable_1.Record) {
        Constructor = recordRepository_1.RecordRepository;
    }
    else {
        debug_1.print(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`, 'error');
        Constructor = base_1.Repository;
    }
    return new Constructor(name, connection, data);
}
exports.makeRepository = makeRepository;
//# sourceMappingURL=factory.js.map