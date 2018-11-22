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

const enumerable = (isEnumerable = true) => function (target, key, desc = {}) {
    desc.enumerable = isEnumerable;
};

const LOG_PREFIX = (name) => name ? `[WEBALORM:${name}]` : `[WEBALORM]`;
/**
 * Shows the current debug state of WEBALORM
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
function print(instanceName, type, message, level, force = false) {
    if ((debugState !== 'disabled') || force) {
        const errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
            }
            else {
                console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
            }
        }
    }
}

class Debugable {
    constructor() {
        this.$logFactory = (level) => (message, force = false) => print(this.$connectionName, this.$debugType, message, level, force);
        this.$log = this.$logFactory('log');
        this.$warn = this.$logFactory('warn');
        this.$error = this.$logFactory('error');
        this.$debug = this.$logFactory('debug');
    }
    /**
     * `true` if the debug is enabled for this class
     */
    get $debugEnabled() { return errorTypeFor(this.$debugType); }
}
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "$debugType", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "$connectionName", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$debugEnabled", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$logFactory", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$log", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$warn", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$error", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$debug", void 0);

class GlobalDebug extends Debugable {
    constructor() {
        super();
        this.$debugType = '*';
        this.$connectionName = '';
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

class Driver {
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * Determines if the driver is supported in current environment
     */
    static get isSupported() {
        throw new Error('Not implemented.');
    }
}

/* TODO: driver that just writes everything to short-term memory */
class FallbackDriver extends Driver {
    constructor() {
        super(...arguments);
        this.repositoryMap = {};
    }
    create(repository, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repositoryMap[repository.name] = this.repositoryMap[repository.name] || [];
            this.repositoryMap[repository.name].push(data);
            return data;
        });
    }
    read(repository, id) {
        throw new Error('Method not implemented.');
    }
    update(repository, id, query) {
        throw new Error('Method not implemented.');
        return Promise.resolve();
    }
    delete(repository, entity) {
        const idx = this.repositoryMap[repository.name].findIndex(e => Object.keys(e).some(key => {
            return e[key] === entity[key];
        }));
        const res = this.repositoryMap[repository.name][idx];
        this.repositoryMap[repository.name].splice(idx, 1);
        return res;
    }
}

class MultiDriver extends Driver {
    constructor(connection, drivers) {
        super(connection);
        this.create = this.request('create');
        this.read = this.request('read');
        this.update = this.request('update');
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
    constructor(name, connection, Data) {
        super();
        this.name = name;
        this.Data = Data;
        this.$debugType = `db:${this.name.toLowerCase()}`;
        this.connection = connection;
        this.$connectionName = connection.name;
        this.api = connection.apiMap;
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.$debugEnabled) {
                this.$warn(`Using default empty repository.`);
            }
            else {
                Debug.$warn(`Using default empty repository for ${name}`, true);
            }
        }
    }
    makeDataInstance(options) {
        return new this.Data(options, this);
    }
}

class BrokenRepository extends Repository {
    get API() {
        return this.api;
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
class EntityRepository extends Repository {
    constructor(name, connection, entity) {
        super(name, connection, entity);
        this.columns = [];
        this.primaryKey = entity.prototype.__id__;
        if (entity.prototype.__col__) {
            this.columns = Object.keys(entity.prototype.__col__);
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
    apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.currentDriver.create(this.driverOptions, options);
            try {
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new QueryResult(true, instance);
                // Call api driver asynchronously
                if (this.api && this.api.add) {
                    this.$log(`API handler execution start: ${this.name}.add()`);
                    this.api.add(options, apiOptions).then(res => {
                        queryResult.result = this.makeDataInstance(result);
                        this.$log(`API handler execution end: ${this.name}.add() => ${res}`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.$error(`API handler execution end: ${this.name}.add() => ${e}`);
                    });
                }
                else {
                    this.$log('No API handler detected');
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
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(entity, updateApiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    /* Do we even need this?.. */
    updateById(id, query) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
    }
    delete(entity, deleteApiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    // TODO: Find, find by, exists, etc...
    count() {
        // TODO: count entities
    }
}

class Storable extends Debugable {
    constructor($repository) {
        super();
        this.$repository = $repository;
        this.$debugType = `db:${this.$repository.name}:entity`;
        this.$connectionName = this.$repository.$connectionName;
    }
}

class Entity extends Storable {
    constructor(options, $repository) {
        super($repository);
        // TODO: check to be writable
        this.__col__ = [];
        if (this.__idCol__) {
            this.__idValue__ = options[this.__idCol__];
            Reflect.deleteProperty(this, this.__idCol__);
            Reflect.defineProperty(this, this.__idCol__, {
                get: () => this.__idValue__,
                set: v => this.__idValue__ = v,
                enumerable: true
            });
        }
    }
    $save() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    $delete() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    static Column(target, key) {
        if (!target.__col__)
            target.__col__ = [];
        target.__col__.push(key);
    }
    static ID(target, key) {
        target.__idCol__ = key;
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Array)
], Entity.prototype, "__col__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idCol__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idValue__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Entity.prototype, "$save", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Entity.prototype, "$delete", null);
const Column = Entity.Column;
const ID = Entity.ID;

class Record extends Storable {
    constructor(options, $repository) {
        super($repository);
    }
    $save() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    $delete() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Record.prototype, "$save", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Record.prototype, "$delete", null);

/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
class RecordRepository extends Repository {
    create(options, apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(options, apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    read(apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    delete(apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
}

function makeRepository(name, connection, data) {
    let Repo = BrokenRepository;
    if (data.prototype instanceof Entity) {
        Repo = EntityRepository;
    }
    else if (data.prototype instanceof Record) {
        Repo = RecordRepository;
    }
    else {
        print(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`, 'error');
    }
    return new Repo(name, connection, data);
}

class Connection extends Debugable {
    /**
     * Creates a WEBALORM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current data structure
     */
    constructor(name, drivers, repositories, apiMap) {
        super();
        this.name = name;
        this.drivers = drivers;
        this.apiMap = apiMap;
        this.$debugType = `connection`;
        this.$connectionName = this.name;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        if (!apiMap) {
            Debug.$warn('The main webalorm functionality is disabled. Are you sure you want to use this without API?', true);
        }
        try {
            if (Array.isArray(drivers)) {
                // Select the first supported driver from the bunch
                const SupportedDrivers = drivers.filter(d => d.isSupported);
                if (SupportedDrivers.length > 0) {
                    this.currentDriver = new SupportedDrivers[0](this);
                }
                else {
                    throw new TypeError('No supported driver provided. Using fallback.');
                }
            }
            else if (drivers instanceof MultiDriver) {
                this.currentDriver = drivers;
            }
            else {
                throw new TypeError('No supported driver provided. Using fallback.');
            }
            this.$log(`Using driver "${this.currentDriver.constructor.name}"`);
        }
        catch (e) {
            this.$error(e.message, true);
            this.currentDriver = new FallbackDriver(this);
        }
        let reProxy;
        if (!Proxy) {
            this.$warn(`window.Proxy is unavailable. Using insufficient property forwarding.`);
            reProxy = (repoName) => Object.defineProperty(this, repoName, {
                get: () => this.repositories[repoName],
            });
        }
        for (const repoName in repositories) {
            const name = repoName;
            const entityConstructor = repositories[name];
            this.repositories[name] = makeRepository(name, {
                name: this.name,
                apiMap: this.apiMap && this.apiMap[name],
                currentDriver: this.currentDriver,
            }, entityConstructor);
            reProxy && reProxy(name);
        }
        if (Proxy) {
            this.$log(`window.Proxy is available. Using modern property forwarding.`);
            return new Proxy(this, {
                get(target, key) {
                    if (!target.repositories[key]) {
                        if (!target[key]) {
                            target.$log(`Repository "${key}" is not registered upon initialization. No other property with the same name was found.`);
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

function prints(messageHandler, level = 'log', type = '*', force = false) {
    return (target, key, desc) => {
        const _print = function () {
            const p = _ => {
                let context = '';
                if (target.constructor && target.constructor.name) {
                    context = `${target.constructor.name}:${String(key)}`;
                }
                else if (target.name) {
                    context = `${target.name}:${String(key)}`;
                }
                else if (this.name) {
                    context = `${this.name}:${String(key)}`;
                }
                print(context, type, _, level, force);
            };
            if (typeof messageHandler === 'function') {
                p(messageHandler.apply(this, arguments));
            }
            else {
                p(messageHandler);
            }
        };
        const assignDescValue = (d) => {
            let original = d.value;
            d.get = function () {
                _print.apply(this, [key, original]);
                return original;
            };
            d.set = function (v) {
                _print.apply(this, [key, original, v]);
                original = v;
            };
        };
        if (desc) {
            if (typeof desc.value === 'function') {
                let original = desc.value;
                desc.value = function () {
                    _print.apply(this, arguments);
                    return original.apply(this, arguments);
                };
            }
            else if (typeof desc.value !== 'undefined' || desc.set) {
                assignDescValue(desc);
            }
        }
        else {
            const d = {};
            if (d.get) {
                const original = d.get;
                d.get = function () {
                    _print.apply(this);
                    return original.apply(this);
                };
            }
            else {
                assignDescValue(d);
            }
            Reflect.deleteProperty(target, key);
            Reflect.defineProperty(target, key, d);
        }
    };
}

export { Connection$1 as Connection, Entity, Column, ID, Record, Storable, prints };
//# sourceMappingURL=webalorm.es.js.map
