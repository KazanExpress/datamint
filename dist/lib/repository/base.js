"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
class Repository extends debug_1.Debugable {
    constructor(name, connection, Data) {
        super();
        this.name = name;
        this.Data = Data;
        this.$debugType = `db:${this.name.toLowerCase()}`;
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.$debugEnabled) {
                this.$warn(`Using default empty repository.`);
            }
            else if (debug_1.Debug.map.db) {
                this.$warn(`Using default empty repository for ${name}`, true);
            }
        }
        this.connection = connection;
        this.$connectionName = connection.name;
        this.api = connection.apiDriver;
    }
    makeDataInstance(options) {
        return new this.Data(options, this);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=base.js.map