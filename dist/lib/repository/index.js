"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
class Repository {
    constructor(name, connection, entity) {
        this.name = name;
        this.connection = connection;
        this.entity = entity;
        this.primaryKey = entity.prototype.__id__;
        this.columns = Object.keys(entity.prototype.__col__);
        delete entity.prototype.__col__;
    }
    add(options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.entity(options)));
    }
    get(id) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.entity({})));
    }
    update(id, options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.entity(options)));
    }
    delete(id) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.entity({})));
    }
}
exports.Repository = Repository;
//# sourceMappingURL=index.js.map