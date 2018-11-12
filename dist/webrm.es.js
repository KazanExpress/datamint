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

/**
 * fromPath
 * Returns a value from an object by a given path (usually string).
 *
 * @see [gist](https://gist.github.com/Raiondesu/759425dede5b7ff38db51ea5a1fb8f11)
 *
 * @param obj an object to get a value from.
 * @param path to get a value by.
 * @param splitter to split the path by. Default is '.' ('obj.path.example')
 * @returns a value from a given path. If a path is invalid - returns undefined.
 */
const Enumerable = (enumerable = true) => function (target, key, desc = {}) {
    desc.enumerable = enumerable;
};

const LOG_PREFIX = (name) => name ? `[WebRM:${name}]` : `[WebRM]`;
/**
 * Shows the current debug state of WebRM
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
function print(instanceName, type, message, level) {
    if (debugState !== 'disabled') {
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
        this.$logFactory = (level) => (message, force = false) => {
            if (this.$debugEnabled || force) {
                print(this.$connectionName, this.$debugType, message, level);
            }
        };
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
    Enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "$debugType", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "$connectionName", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$debugEnabled", null);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$logFactory", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$log", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$warn", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Debugable.prototype, "$error", void 0);
__decorate([
    Enumerable(false),
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

/* TODO */
class ApiDriver extends Driver {
    constructor(connection, apiMap) {
        super(connection);
        this.apiMap = apiMap;
    }
    create(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.create) {
            return repo.create(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    read(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.read) {
            return repo.read(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    update(repositoryName, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.apiMap[repositoryName];
            if (!repo || !repo.update) {
                return Promise.reject( /* TODO: error handling */);
            }
            if (query) {
                const result = yield this.read(repositoryName, data);
                return repo.update(query(result));
            }
            return repo.update(data);
        });
    }
    delete(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.delete) {
            return repo.delete(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    static get isSupported() { return true; }
}

/* TODO: driver that just writes everything to short-term memory */
class FallbackDriver extends Driver {
    constructor() {
        super(...arguments);
        this.repositoryMap = {};
    }
    create(repositoryName, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repositoryMap[repositoryName] = this.repositoryMap[repositoryName] || [];
            this.repositoryMap[repositoryName].push(entity);
            return entity;
        });
    }
    read(repositoryName, id) {
        throw new Error('Method not implemented.');
    }
    update(repositoryName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
            return {};
        });
    }
    delete(repositoryName, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = this.repositoryMap[repositoryName].findIndex(e => Object.keys(e).some(key => {
                return e[key] === entity[key];
            }));
            const res = this.repositoryMap[repositoryName][idx];
            this.repositoryMap[repositoryName].splice(idx, 1);
            return res;
        });
    }
}

class Repository extends Debugable {
    constructor(name, connection, Data) {
        super();
        this.name = name;
        this.Data = Data;
        this.$debugType = `db:${this.name.toLowerCase()}`;
        this.connection = connection;
        this.$connectionName = connection.name;
        this.api = connection.apiDriver;
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.$debugEnabled) {
                this.$warn(`Using default empty repository.`);
            }
            else if (Debug.map.db) {
                this.$warn(`Using default empty repository for ${name}`, true);
            }
        }
    }
    makeDataInstance(options) {
        return new this.Data(options, this);
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
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.currentDriver.create(this.name, options);
            try {
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new QueryResult(true, instance);
                // Call api driver asynchronously
                if (apiOptions && this.api) {
                    this.$log(`API handler execution start: ${this.name}.add()`);
                    this.api.create(this.name, apiOptions).then(res => {
                        queryResult.result = this.makeDataInstance(result);
                        this.$log(`API handler execution end: ${this.name}.add()`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.$log(`API handler execution end: ${this.name}.add()`);
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
    get(id) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(entity) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    updateById(id, query) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
    }
    delete(entity) {
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
        target.__col__.push(key);
    }
    static ID(target, key) {
        target.__idCol__ = key;
    }
}
__decorate([
    Enumerable(false),
    __metadata("design:type", Array)
], Entity.prototype, "__col__", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idCol__", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idValue__", void 0);
__decorate([
    Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Entity.prototype, "$save", null);
__decorate([
    Enumerable(false),
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
    Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Record.prototype, "$save", null);
__decorate([
    Enumerable(false),
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
    create(options) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(options) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    read() {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    delete() {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
}

function makeRepository(name, connection, data) {
    let Constructor;
    if (data.prototype instanceof Entity) {
        Constructor = EntityRepository;
    }
    else if (data.prototype instanceof Record) {
        Constructor = RecordRepository;
    }
    else {
        print(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`, 'error');
        Constructor = Repository;
    }
    return new Constructor(name, connection, data);
}

class Connection extends Debugable {
    /**
     * Creates a WebRM connection instance.
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
        if (apiMap) {
            this.apiDriver = new ApiDriver(this, apiMap);
        }
        else {
            Debug.$warn('The main webrm functionality is disabled. Are you sure you want to use this without API?', true);
        }
        // Select the first supported driver from the bunch
        const SupportedDriver = drivers.find(d => d.isSupported);
        if (SupportedDriver) {
            // TODO: multi-driver mode
            this.$log(`Using driver "${SupportedDriver.name}" as the first supported driver`);
            this.currentDriver = new SupportedDriver(this);
        }
        else {
            this.$warn('No supported driver provided. Using fallback.');
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
                apiDriver: this.apiMap && this.apiMap[name] && this.apiDriver,
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

export { Connection$1 as Connection, Entity, Column, ID, Record, Storable };
//# sourceMappingURL=webrm.es.js.map
