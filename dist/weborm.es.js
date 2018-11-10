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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
class QueryResult {
    constructor(ok, result, error) {
        this.error = error;
        this.handlers = [];
        this._ok = ok;
        let promise;
        if (typeof result === 'function') {
            promise = new Promise(result);
        }
        else {
            promise = result;
        }
        this._result = promise;
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
        this._result = value;
        this.handlers.forEach((h) => __awaiter(this, void 0, void 0, function* () { return h(); }));
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
        return new QueryResult(true, Promise.resolve(new this.entity(options)));
    }
    get(id) {
        return new QueryResult(true, Promise.resolve(new this.entity({})));
    }
    updateById(id, query) {
        return new QueryResult(true, Promise.resolve(new this.entity({})));
    }
    delete(id) {
        return new QueryResult(true, Promise.resolve(new this.entity({})));
    }
}

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

class FallbackDriver extends Driver {
    create(repositoryName, entity) {
        throw new Error('Method not implemented.');
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
            throw new Error('Method not implemented.');
            return {};
        });
    }
}

const LOG_PREFIX = (name) => name ? `[WebORM:${name}]` : `[WebORM]`;
class Debug {
    /**
     * `true` if any debug is enabled
     */
    static get isEnabled() { return this.debugState !== 'disabled'; }
    /**
     * Shows the current debug state of WebORM
     *
     * - `enabled` - all the logs and exceptions are enabled
     * - `custom` - custom rules are set via a `debug()` function
     * - `disabled` - all the logs and most exceptions are suppressed
     */
    static get state() { return this.debugState; }
    static set state(v) { this.debugState = v; }
    static error(instanceName, type, message) {
        return this.print(instanceName, type, message, 'error');
    }
    static log(instanceName, type, message) {
        return this.print(instanceName, type, message, 'log');
    }
    static warn(instanceName, type, message) {
        return this.print(instanceName, type, message, 'warn');
    }
    static errorType(type) {
        if (this.map['*']) {
            return true;
        }
        const isString = (t) => typeof t === 'string';
        if (isString(type) && this.map[type]) {
            return this.map[type];
        }
        if (isString(type)) {
            const matchingType = Object.keys(this.map)
                .find(t => !!t && t.includes(type) && !!this.map[t]);
            return matchingType || false;
        }
        return Object.keys(this.map).find(t => type.test(t)) || false;
    }
    static print(instanceName, type, message, level) {
        if (this.debugState !== 'disabled') {
            const typeOfError = this.errorType(type);
            if (typeOfError) {
                if (typeOfError === 'hard' && level === 'error') {
                    throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
                }
                else {
                    console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
            }
        }
    }
    static prints(message, level = 'log', type = '*') {
        return (target, key, desc) => {
            Object.defineProperty(this.decoratedLogs, key, desc || {
                value: undefined,
                writable: true,
                enumerable: true
            });
            Object.defineProperty(target, key, {
                get: () => {
                    this.print('', type, message, level);
                    return this.decoratedLogs[key];
                },
                set: v => {
                    this.decoratedLogs[key] = v;
                }
            });
        };
    }
}
Debug.debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
Debug.map = {};
Debug.decoratedLogs = {};

class Connection {
    /**
     * Creates an instance of WebOrm.
     * @param connectionName the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current entity structure
     */
    constructor(connectionName, drivers, repositories, apiMap // TODO
    ) {
        this.connectionName = connectionName;
        this.drivers = drivers;
        this.apiMap = apiMap;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        // Select the first supported driver from the bunch
        const SupportedDriver = drivers.find(d => d.isSupported);
        if (SupportedDriver) {
            // TODO: multi-driver mode
            Debug.log(this.connectionName, 'orm', `Using driver "${SupportedDriver.name}" as the first supported driver`);
            this.currentDriver = new SupportedDriver(this);
        }
        else {
            Debug.warn(this.connectionName, 'orm', 'No supported driver provided. Using fallback.');
            this.currentDriver = new FallbackDriver(this);
        }
        let reProxy;
        if (!Proxy) {
            Debug.warn(this.connectionName, 'orm', `window.Proxy is unavailable. Using insufficient property forwarding.`);
            reProxy = (repoName) => Object.defineProperty(this, repoName, {
                get: () => this.repositories[repoName],
            });
        }
        for (const repoName in repositories) {
            const entityConstructor = repositories[repoName];
            this.repositories[repoName] = new Repository(repoName, this, entityConstructor);
            reProxy && reProxy(repoName);
        }
        if (Proxy) {
            Debug.log(this.connectionName, 'orm', `window.Proxy is available. Using modern property forwarding.`);
            return new Proxy(this, {
                get(target, key) {
                    if (!target.repositories[key]) {
                        if (!target[key]) {
                            Debug.log(target.connectionName, 'orm', `Repository "${key}" is not registered upon initialization. No other property with the same name was found.`);
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
    }
    static debug(type, exceptions) {
        if (typeof type === 'boolean') {
            Debug.state = (type ? 'enabled' : 'disabled');
        }
        else {
            Debug.state = ('custom');
            Debug.map[type] = exceptions || !Debug.map[type];
        }
    }
}

const Connection$1 = Connection;

const Column = (target, key) => {
    target.__col__ = {};
    Object.defineProperty(target.__col__, key, {
        value: true,
        enumerable: true,
        writable: true
    });
};
const ID = (target, key) => {
    target.__id__ = key;
};

class Entity {
    constructor(options) {
    }
    $save() {
        return Promise.resolve();
    }
    $delete() {
        return Promise.resolve();
    }
}

class Record {
    $save() {
        throw new Error('Method not implemented.');
    }
    $delete() {
        throw new Error('Method not implemented.');
    }
}

export { Connection$1 as Connection, Column, ID, Entity, Record };
//# sourceMappingURL=weborm.es.js.map
