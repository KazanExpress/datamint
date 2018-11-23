"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
const base_1 = require("./base");
/**
 * A typical multi-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 * @template `ID` entity primary key type
 * @template `IDKey` entity primary key name
 */
class EntityRepository extends base_1.Repository {
    constructor(name, connection, entity) {
        super(name, connection, entity);
        this.columns = [];
        this.primaryKey = entity.prototype.__idCol__;
        delete entity.prototype.__idCol__;
        if (entity.prototype.__col__) {
            this.columns = entity.prototype.__col__;
            delete entity.prototype.__col__;
        }
        else {
            this.columns = Object.keys(new entity({}, this));
        }
    }
    get driverOptions() {
        return {
            name: this.name,
            columns: this.columns,
            primaryKey: this.primaryKey
        };
    }
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions // Pass false to disable the api call
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection.currentDriver.create(this.driverOptions, options);
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new queryResult_1.QueryResult(true, instance);
                // Call api driver asynchronously
                if (this.api && this.api.add && apiOptions !== false) {
                    this.$log(`API handler execution start: ${this.name}.add()`);
                    // @TODO: implement async request queue
                    this.api.add(options, apiOptions).then(res => {
                        queryResult.result = this.makeDataInstance(res);
                        this.$log(`API handler execution end: ${this.name}.add() => ${JSON.stringify(res, undefined, '  ')}`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.$error(`API handler execution end: ${this.name}.add() => ${e}`);
                    });
                }
                else {
                    this.$log('No API handler called');
                }
                return queryResult;
            }
            catch (e) {
                this.$error(e);
                return new queryResult_1.QueryResult(false, this.makeDataInstance(options), e);
            }
        });
    }
    get(id, getApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection.currentDriver.read(this.driverOptions, id);
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new queryResult_1.QueryResult(true, instance);
                // Call api driver asynchronously
                if (this.api && this.api.get && getApiOptions !== false) {
                    this.$log(`API handler execution start: ${this.name}.get()`);
                    // @TODO: implement async request queue
                    this.api.get(id, getApiOptions).then(res => {
                        queryResult.result = this.makeDataInstance(res);
                        this.$log(`API handler execution end: ${this.name}.get() => ${JSON.stringify(res, undefined, '  ')}`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.$error(`API handler execution end: ${this.name}.get() => ${e}`);
                    });
                }
                else {
                    this.$log('No API handler called');
                }
                return queryResult;
            }
            catch (e) {
                return new queryResult_1.QueryResult(false, undefined, e);
            }
        });
    }
    update(entity, updateApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    /* Do we even need this?.. */
    updateById(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
        });
    }
    delete(entity, deleteApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    // TODO: Find, find by, exists, etc...
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: count entities
        });
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity.js.map