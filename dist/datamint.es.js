/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const enumerable = (isEnumerable = true) => function (target, key, desc) {
    let descriptor = Object.getOwnPropertyDescriptor(target, key) || desc || {};
    if (descriptor.enumerable != isEnumerable) {
        descriptor.enumerable = !!isEnumerable;
        if (descriptor.get || descriptor.set) {
            descriptor.configurable = descriptor.configurable === undefined ? true : descriptor.configurable;
        }
        else {
            descriptor.writable = descriptor.writable === undefined ? true : descriptor.writable;
        }
        Reflect.deleteProperty(target, key);
        Object.defineProperty(target, key, descriptor);
    }
};

const LOG_PREFIX = (name) => name ? `[datamint:${name}]` : `[datamint]`;
/**
 * Shows the current debug state of DATAMINT
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
let debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
const debugMap = {};
function setDebugState(state) {
    debugState = state;
}
function errorTypeFor(type) {
    if (debugMap['*']) {
        return debugMap['*'];
    }
    const isString = (t) => typeof t === 'string';
    if (isString(type) && debugMap[type]) {
        return debugMap[type];
    }
    if (isString(type)) {
        const matchingType = Object.keys(debugMap)
            .find(t => !!t && t.includes(type) && !!debugMap[t]);
        return matchingType || false;
    }
    return Object.keys(debugMap).find(t => type.test(t)) || false;
}
function bindConsole(name, instanceName, type) {
    if (typeof window !== 'undefined') {
        return window.console[name].bind(console, `%c${LOG_PREFIX(instanceName)}%c:%c${type}%c`, 'color: purple', 'color: initial', 'color: blue', 'color: initial', '-');
    }
    else {
        return console[name].bind(console, `${LOG_PREFIX(instanceName)}:${type}`, '-');
    }
}
function getPrintFunction(instanceName, type, level) {
    if ((debugState !== 'disabled')) {
        const errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                return (message) => { throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`); };
            }
            else {
                return bindConsole(level, instanceName, type);
            }
        }
    }
    return () => undefined;
}

class Debugable {
    /**
     * `true` if the debug is enabled for this class
     */
    get isDebugEnabled() { return errorTypeFor(this.debugType); }
    $logFactory(level) {
        return getPrintFunction(this.connectionName, this.debugType, level);
    }
    get $log() { return this.$logFactory('log'); }
    get $warn() { return this.$logFactory('warn'); }
    get $error() { return this.$logFactory('error'); }
    get $debug() { return this.$logFactory('debug'); }
}
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "debugType", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "connectionName", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "isDebugEnabled", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Debugable.prototype, "$logFactory", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$log", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$warn", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$error", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$debug", null);
class DebugInstance extends Debugable {
    constructor(debugType, connectionName) {
        super();
        this.debugType = debugType;
        this.connectionName = connectionName;
    }
}

class GlobalDebug extends Debugable {
    constructor() {
        super();
        this.debugType = '*';
        this.connectionName = '';
    }
    get map() {
        return debugMap;
    }
    get state() {
        return debugState;
    }
}
GlobalDebug.instance = new GlobalDebug();
const Debug = GlobalDebug.instance;

class Connection extends Debugable {
    /**
     * Creates a connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param repositories sets the relation of a repository name to its contents' options.
     */
    constructor(connectionName, repositories) {
        super();
        this.connectionName = connectionName;
        this.debugType = `connection`;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        let reProxy;
        if (!Proxy) {
            this.$warn(`Proxy is unavailable. Using insufficient property forwarding.`);
            reProxy = (repoName) => Object.defineProperty(this, repoName, {
                get: () => this.repositories[repoName],
            });
        }
        for (const repoName in repositories) {
            this.repositories[repoName] = repositories[repoName](repoName, this);
            reProxy && reProxy(repoName);
        }
        // Make repositories immutable
        this.repositories = Object.freeze(this.repositories);
        if (Proxy) {
            this.$log(`Proxy is available. Using modern property forwarding.`);
            return new Proxy(this, {
                get(target, key) {
                    if (!target.repositories[key]) {
                        if (typeof target[key] === 'undefined') {
                            target.$warn(`Repository "${key}" is not registered upon initialization. No other property with the same name was found.`);
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
    }
    static $debug(type, exceptions) {
        if (typeof type === 'undefined') {
            return debugState;
        }
        if (typeof type === 'boolean') {
            setDebugState(type ? 'enabled' : 'disabled');
            debugMap['*'] = exceptions || type;
        }
        else {
            setDebugState('custom');
            debugMap[type] = exceptions || !debugMap[type];
        }
        return;
    }
}

const Connection$1 = Connection;

class Driver extends Debugable {
    constructor(connection) {
        super();
        this.connection = connection;
        this.debugType = 'driver';
        this.connectionName = this.connection.name;
    }
    /**
     * Determines if the driver is supported in current environment
     */
    static get isSupported() {
        throw new Error('Not implemented.');
    }
}

/**
 * @todo refactor, code is a mess
 */
class FallbackDriver extends Driver {
    constructor() {
        super(...arguments);
        this.repositoryMap = {};
    }
    create({ primaryKey, name }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.repositoryMap[name]) {
                if ({ primaryKey, name }.primaryKey) {
                    this.repositoryMap[name] = {};
                }
                else {
                    this.repositoryMap[name] = [];
                }
            }
            const repo = this.repositoryMap[name];
            if (primaryKey && !Array.isArray(repo)) {
                const key = String(data[primaryKey]);
                repo[key] = data;
            }
            else if (Array.isArray(repo)) {
                repo.push(data);
            }
            return data;
        });
    }
    findById({ primaryKey, name }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.repositoryMap[name];
            if (primaryKey) {
                if (Array.isArray(repo)) {
                    return repo.find(i => i[primaryKey] === id);
                }
                else {
                    if (primaryKey) {
                        let result = repo[String(id)];
                        if (!result) {
                            result = Object.values(repo).find(i => i[primaryKey] === id);
                        }
                        return result;
                    }
                    else if (id) {
                        return repo[String(id)];
                    }
                }
            }
            else if (Array.isArray(repo)) {
                return repo[id];
            }
            return Object.values(repo)[0];
        });
    }
    update({ name }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
            return [];
        });
    }
    updateOne({ name, primaryKey }, id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.repositoryMap[name];
            let res = undefined;
            const mixInQuery = (obj) => typeof query === 'function' ? Object.assign({}, obj, query(obj)) : Object.assign({}, obj, query);
            if (primaryKey) {
                if (Array.isArray(repo)) {
                    const idx = repo.findIndex(i => i[primaryKey] === id);
                    if (idx === -1) {
                        this.$error(`No entity by id ${String(id)} was found`);
                        return res;
                    }
                    repo[idx] = res = mixInQuery(repo[idx]);
                }
                else {
                    repo[id] = res = mixInQuery(repo[id]);
                }
            }
            else if (Array.isArray(repo) && typeof id === 'number') {
                repo[id] = res = mixInQuery(repo[id]);
            }
            else {
                this.$error(`Id ${String(id)} is of the wrong type ${typeof id}`);
            }
            return res;
        });
    }
    deleteOne({ name, primaryKey }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.repositoryMap[name];
            let res;
            if (primaryKey) {
                if (Array.isArray(repo)) {
                    const idx = repo.findIndex(i => i[primaryKey] === id);
                    res = repo[idx];
                    repo.splice(idx, 1);
                }
                else {
                    res = repo[id];
                    repo[id] = undefined;
                    delete repo[id];
                }
            }
            else if (Array.isArray(repo) && typeof id === 'number') {
                res = repo[id];
                repo.splice(id, 1);
            }
            else {
                throw new Error(`Id ${String(id)} is of the wrong type ${typeof id}`);
            }
            return res;
        });
    }
    delete({ name, primaryKey }, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.repositoryMap[name];
            let res;
            // if (isEntityRepo(repository)) {
            //   const key = Object.keys(repo).findIndex(e => Object.keys(repo[e]).some(key => {
            //     return e[key] === entity[key];
            //   }));
            //   res = this.repositoryMap[repository.name][key];
            //   this.repositoryMap[repository.name][key] = undefined;
            //   delete this.repositoryMap[repository.name][key];
            // } else {
            //   res = this.repositoryMap[repository.name];
            //   this.repositoryMap[repository.name] = undefined;
            // }
            return res;
        });
    }
}

class MultiDriver extends Driver {
    constructor(connection, drivers) {
        super(connection);
        this.create = this.request('create');
        this.findById = this.request('findById');
        this.update = this.request('update');
        this.updateOne = this.request('updateOne');
        this.deleteOne = this.request('deleteOne');
        this.delete = this.request('delete');
        this.drivers = drivers.filter(d => d.isSupported).map(D => new D(connection));
    }
    request(type) {
        return function () {
            const args = arguments;
            const allResponses = Promise.all(this.drivers.map(d => d[type].apply(d, args)));
            return allResponses[0];
        }.bind(this);
    }
    static get isSupported() { return true; }
}

class Repository extends Debugable {
    constructor(name, connectionName, Data, api) {
        super();
        this.name = name;
        this.connectionName = connectionName;
        this.Data = Data;
        this.api = api;
        this.columns = [];
        this.debugType = `db:${this.name.toLowerCase()}`;
        if (!api) {
            this.$warn('The main functionality is disabled. Are you sure you want to use this without API?');
        }
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.isDebugEnabled) {
                this.$error(`Using default empty repository.`);
            }
            else {
                Debug.$error(`Using default empty repository for ${name}`);
            }
        }
        if (Data.prototype.__col__) {
            {
                this.columns = Data.prototype.__col__.slice();
                delete Data.prototype.__col__;
            }
        }
        else {
            this.columns = Object.keys(new Data({}, this));
        }
    }
    makeDataInstance(options) {
        return new this.Data(options, this);
    }
}
function selectDriver(drivers, repoName) {
    const error = () => {
        let msg = `No supported driver provided for ${repoName}.`;
        if (Debug.map['*'] !== 'hard') {
            msg += ' Using fallback.';
        }
        Debug.$error(msg);
    };
    if (Array.isArray(drivers)) {
        // Select the first supported driver from the bunch
        const SupportedDrivers = drivers.filter(d => d.isSupported);
        if (SupportedDrivers.length > 0) {
            return SupportedDrivers[0];
        }
        else {
            return error(), FallbackDriver;
        }
    }
    else if (drivers instanceof MultiDriver) {
        return drivers;
    }
    else {
        return error(), FallbackDriver;
    }
}

/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
class QueryResult {
    constructor(ok, result, error) {
        this.handlers = [];
        this._ok = ok;
        this._result = result;
        this._error = error;
    }
    /**
     * Determines whether the incapsulated data is OK and contains no errors
     */
    get ok() { return this._ok; }
    /**
     * The resulting data of the query request
     */
    get result() { return this._result; }
    set result(value) {
        this._ok = true;
        this._result = value;
        this.handlers.forEach(h => h(this.error, this.result));
    }
    /**
     * The error of the query (if any)
     */
    get error() { return this._error; }
    set error(value) {
        this._ok = false;
        this._error = value;
        this.handlers.forEach(h => h(this.error, this.result));
    }
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    onChange(callback) {
        this.handlers.push(callback);
    }
    /**
     * Unsubscribe the callback from the result data changes
     */
    offChange(callback) {
        const idx = this.handlers.indexOf(callback);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Boolean)
], QueryResult.prototype, "_ok", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], QueryResult.prototype, "_result", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Error)
], QueryResult.prototype, "_error", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Array)
], QueryResult.prototype, "handlers", void 0);

class Storable {
    constructor(__options, ..._) {
        this.__col__ = [];
        this.__options = __options;
    }
    static Property(target, key) {
        if (!target.__col__) {
            target.__col__ = [];
        }
        target.__col__.push(key);
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Array)
], Storable.prototype, "__col__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Storable.prototype, "__options", void 0);

class Entity extends Storable {
    constructor(options, ...args) {
        super(options, ...args);
        if (this.__idKey__ && options[String(this.__idKey__)]) {
            Reflect.deleteProperty(this, '__idValue__');
            Reflect.defineProperty(this, '__idValue__', {
                value: options[String(this.__idKey__)],
                writable: true,
                enumerable: false
            });
            Reflect.deleteProperty(this, this.__idKey__);
            Reflect.defineProperty(this, this.__idKey__, {
                get: () => this.__idValue__,
                set: v => this.__idValue__ = v,
                enumerable: true
            });
        }
    }
    static ID(target, key) {
        target.__idKey__ = key;
        target.constructor.Property(target, key);
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idKey__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idValue__", void 0);
/**
 * Enables ActiveRecord pattern for the entity
 */
class SaveableEntity extends Entity {
    constructor(options, repo) {
        super(options, repo);
        if (repo) {
            this.__repo = repo;
            this.__debug = new DebugInstance(`db:${repo.name}:entity`, this.__repo.connectionName);
        }
        else {
            this.__debug = new DebugInstance('*', '');
            this.__contextWarning();
        }
    }
    __contextWarning(optional = '') {
        this.__debug.$warn(`Seems like the entity "${this.constructor.name}" was initialized in a wrong context.\n${optional}`);
    }
    $save() {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        const idkey = this.__idKey__;
        return this.__repo.updateById(idkey ? this[idkey] : 0, () => this).then(r => r.result).catch(e => { throw e; });
    }
    $delete() {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        const idkey = this.__idKey__;
        return this.__repo.delete(idkey ? this[idkey] : 0).then(r => r.result).catch(e => { throw e; });
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", DebugInstance)
], SaveableEntity.prototype, "__debug", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], SaveableEntity.prototype, "__repo", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaveableEntity.prototype, "__contextWarning", null);

/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
class RecordRepositoryClass extends Repository {
    constructor(name, connectionName, currentDriver, record, api) {
        super(name, connectionName, record, api);
        this.currentDriver = currentDriver;
    }
    create(options, apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    update(options, apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    read(apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    delete(apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
}
function RecordRepository(options) {
    return (name, connection) => new RecordRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api);
}

class Record extends Storable {
    constructor(options, ...args) { super(options, ...args); }
}
class SaveableRecord extends Record {
    constructor(options, repo) {
        super(options, repo);
        if (repo) {
            this.__repo = repo;
            this.__debug = new DebugInstance(`db:${repo.name}:entity`, this.__repo.connectionName);
        }
        else {
            this.__debug = new DebugInstance('*', '');
            this.__contextWarning();
        }
    }
    __contextWarning(optional = '') {
        this.__debug.$warn(`Seems like the record "${this.constructor.name}" was initialized in a wrong context.\n${optional}`);
    }
    $save() {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.update(this)
            .then(r => r.result)
            .catch(e => { throw e; });
    }
    $delete() {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.delete()
            .then(r => r.result)
            .catch(e => { throw e; });
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", DebugInstance)
], SaveableRecord.prototype, "__debug", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", RecordRepositoryClass)
], SaveableRecord.prototype, "__repo", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaveableRecord.prototype, "__contextWarning", null);

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
class EntityRepositoryClass extends Repository {
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
function EntityRepository(options) {
    return (name, connection) => new EntityRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api);
}

class RemoteRepositoryClass extends Repository {
    get API() {
        return this.api;
    }
}
function RemoteRepository(options) {
    return (name, connection) => new RemoteRepositoryClass(name, connection.name, options.model, options.api);
}

export { Connection$1 as Connection, Repository, EntityRepository, RecordRepository, RemoteRepository, Storable, Entity, SaveableEntity, Record, SaveableRecord, Driver, FallbackDriver, MultiDriver };
//# sourceMappingURL=datamint.es.js.map
