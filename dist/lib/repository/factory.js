"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storable_1 = require("../storable");
const entityRepository_1 = require("./entityRepository");
const recordRepository_1 = require("./recordRepository");
const debug_1 = require("../debug");
const base_1 = require("./base");
function makeRepository(name, connection, data) {
    if (data.prototype instanceof storable_1.Entity) {
        return new entityRepository_1.EntityRepository(name, connection, data);
    }
    else if (data.prototype instanceof storable_1.Record) {
        return new recordRepository_1.RecordRepository(name, connection, data);
    }
    else {
        debug_1.Debug.error(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`);
        return new base_1.Repository(name, connection, data);
    }
}
exports.makeRepository = makeRepository;
//# sourceMappingURL=factory.js.map