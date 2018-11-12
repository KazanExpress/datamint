"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
class Repository extends debug_1.Debugable {
    constructor(name, connection, Data) {
        super();
        this.name = name;
        this.Data = Data;
        this.debugType = `db:${this.name}`;
        this.connectionName = this.connection.name;
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.debugEnabled) {
                this.warn(`Using default empty repository.`);
            }
            else if (debug_1.Debug.map.db) {
                this.warn(`Using default empty repository for ${name}`);
            }
        }
        this.connection = connection;
        this.api = connection.apiDriver;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=base.js.map