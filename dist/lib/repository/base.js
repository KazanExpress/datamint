"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
class Repository {
    constructor(name, connection, Data) {
        this.name = name;
        this.connection = connection;
        this.Data = Data;
        if (
        // If this class was instantiated directly (without inheritance)
        Repository.prototype === this.constructor.prototype
            // And debug for db:[name] is set
            && debug_1.Debug.map[`db:${name}`]) {
            debug_1.Debug.warn(connection.name, `db:${name}`, `Using default empty repository for ${name}`);
        }
    }
}
exports.Repository = Repository;
//# sourceMappingURL=base.js.map