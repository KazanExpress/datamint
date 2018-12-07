var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FallbackDriver } from '../drivers';
import { QueryResult } from '../queryResult';
import { Entity } from '../storable';
import { Repository, selectDriver } from './base';
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
export class EntityRepositoryClass extends Repository {
    constructor(name, connectionName, currentDriver, entity, api) {
        super(name, connectionName, entity, api);
        this.currentDriver = currentDriver;
        // If no unique ID is set for the entity
        if (!entity.prototype.__idKey__) {
            const falseInstance = new entity({}, this);
            const defaultIdAliases = ['id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__'];
            const key = Object.keys(falseInstance).find(key => defaultIdAliases.some(a => a === key));
            // Auto-apply the ID decorator if found any compatible property
            if (key) {
                Entity.ID(entity.prototype, key);
            }
            else {
                this.$error(`No ID field is set for "${entity.name}".`);
            }
        }
        this.primaryKey = entity.prototype.__idKey__;
        if (this.primaryKey && !this.columns.includes(String(this.primaryKey))) {
            this.columns.push(String(this.primaryKey));
        }
        delete entity.prototype.__idKey__;
    }
    get driverOptions() {
        return {
            name: this.name,
            columns: this.columns,
            primaryKey: this.primaryKey,
            connectionName: this.connectionName
        };
    }
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions // Pass false to disable the api call
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.currentDriver.create(this.driverOptions, options);
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new QueryResult(true, instance);
                // Call api driver asynchronously
                if (this.api && this.api.add && apiOptions !== false) {
                    this.$log(`API handler execution start: ${this.name}.add()`);
                    // @TODO: implement async request queue
                    this.api.add(options, apiOptions).then(res => {
                        if (typeof res !== 'undefined') {
                            queryResult.result = this.makeDataInstance(res);
                            this.$log(`API handler execution end: ${this.name}.add() => ${JSON.stringify(res, undefined, '  ')}`);
                        }
                        else {
                            throw new TypeError('result is undefined');
                        }
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
                return new QueryResult(false, this.makeDataInstance(options), e);
            }
        });
    }
    get(id, getApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.currentDriver.findById(this.driverOptions, id);
                if (!result) {
                    throw new Error(`No results found for id ${id}`);
                }
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new QueryResult(true, instance);
                // Call api driver asynchronously
                if (this.api && this.api.get && getApiOptions !== false) {
                    this.$log(`API handler execution start: ${this.name}.get()`);
                    // @TODO: implement async request queue
                    this.api.get(id, getApiOptions).then(res => {
                        if (typeof res !== 'undefined') {
                            queryResult.result = this.makeDataInstance(res);
                            this.$log(`API handler execution end: ${this.name}.get() => ${JSON.stringify(res, undefined, '  ')}`);
                        }
                        else {
                            throw new TypeError('result is undefined');
                        }
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
                return new QueryResult(false, undefined, e);
            }
        });
    }
    update(entity, updateApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    /* Do we even need this?.. */
    updateById(id, query, updateApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
        });
    }
    delete(entity, deleteApiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    // TODO: Find, find by, exists, etc...
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: count entities
        });
    }
}
export function EntityRepository(options) {
    return (name, connection) => new EntityRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api);
}
//# sourceMappingURL=entity.js.map